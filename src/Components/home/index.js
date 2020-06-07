import React from 'react';
import Featured from './featured';
import MatchesHome from './matches';
import MeetPlayers from './meetPlayers';
import Promotion from './promotion';

const Home = (props) => (
	<div className='bck_blue'>
		<Featured />
		<MatchesHome />
		<MeetPlayers />
		<Promotion />
	</div>
);

export default Home;
