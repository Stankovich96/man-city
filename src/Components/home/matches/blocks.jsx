import React, { useEffect, useState } from 'react';
import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

import MatchesBlock from '../../ui/matches_block';
import Slide from 'react-reveal/Slide';

const Blocks = () => {
	const [state, setState] = useState({
		matches: [],
	});
	useEffect(() => {
		firebaseMatches
			.limitToLast(6)
			.once('value')
			.then((snapshot) => {
				const matches = firebaseLooper(snapshot);
				setState({
					matches: reverseArray(matches),
				});
			});
		return () => {
			firebaseMatches.off();
		};
	}, [state]);
	const showMatches = (matches) =>
		matches
			? matches.map((match) => (
					<Slide bottom key={match.id}>
						<div className='item'>
							<div className='wrapper'>
								<MatchesBlock match={match} />
							</div>
						</div>
					</Slide>
			  ))
			: null;
	return <div className='home_matches'>{showMatches(state.matches)}</div>;
};

export default Blocks;
