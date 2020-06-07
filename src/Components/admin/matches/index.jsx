import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../hoc/AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

const AdminMatches = () => {
	const [state, setState] = useState({
		isLoading: true,
		matches: [],
	});

	useEffect(() => {
		firebaseMatches.once('value').then((snapshot) => {
			const matches = firebaseLooper(snapshot);

			setState({
				isLoading: false,
				matches: reverseArray(matches),
			});
		});

		return () => {
			firebaseMatches.off();
		};
	}, [state]);

	return (
		<AdminLayout>
			<div>
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Match</TableCell>
								<TableCell>Result</TableCell>
								<TableCell>Final</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{state.matches
								? state.matches.map((match, i) => {
										const {
											date,
											id,
											away,
											local,
											resultAway,
											resultLocal,
											final,
										} = match;

										return (
											<TableRow key={i}>
												<TableCell>{date}</TableCell>
												<TableCell>
													<Link to={`/admin_matches/edit_match/${id}`}>
														{away} <strong>-</strong>
														{local}
													</Link>
												</TableCell>
												<TableCell>
													{resultAway}
													<strong>-</strong>
													{resultLocal}
												</TableCell>
												<TableCell>
													{final === 'Yes' ? (
														<span className='matches_tag_red'>Final</span>
													) : (
														<span className='matches_tag_green'>
															Not Played yet
														</span>
													)}
												</TableCell>
											</TableRow>
										);
								  })
								: null}
						</TableBody>
					</Table>
				</Paper>
				<div className='admin_progress'>
					{state.isLoading ? (
						<CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
					) : (
						''
					)}
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminMatches;
