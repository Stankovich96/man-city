import React, { useEffect, useState } from 'react';
import { firebaseDB } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const style = {
	cell: {
		padding: '4px 16px 4px 11px',
		borderBottom: '1px solid #ffffff',
		color: '#ffffff',
		textAlign: 'center',
	},
};
const LeagueTable = () => {
	const [PositionState, setPositionState] = useState({
		positions: [],
	});

	useEffect(() => {
		firebaseDB
			.ref('positions')
			.once('value')
			.then((snapshot) => {
				const positions = firebaseLooper(snapshot);
				setPositionState({ ...PositionState, positions });
			});
		return () => firebaseDB.ref('positions').off();
	}, [PositionState]);

	const { positions: allPositions } = PositionState;

	const showTeamPositions = (positions) =>
		positions.length > 0
			? positions.map((position, i) => {
					const { team, w, d, l, pts } = position;
					return (
						<TableRow key={i}>
							<TableCell style={style.cell}>{i + 1}</TableCell>
							<TableCell style={style.cell}>{team}</TableCell>
							<TableCell style={style.cell}>{w}</TableCell>
							<TableCell style={style.cell}>{d}</TableCell>
							<TableCell style={style.cell}>{l}</TableCell>
							<TableCell style={style.cell}>{pts}</TableCell>
						</TableRow>
					);
			  })
			: null;

	return (
		<div className='league_table_wrapper'>
			<div className='title'>League Table</div>
			<div style={{ background: '#98c6e9' }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell style={style.cell}>Pos</TableCell>
							<TableCell style={style.cell}>Team</TableCell>
							<TableCell style={style.cell}>W</TableCell>
							<TableCell style={style.cell}>L</TableCell>
							<TableCell style={style.cell}>D</TableCell>
							<TableCell style={style.cell}>Pts</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{showTeamPositions(allPositions)}</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default LeagueTable;
