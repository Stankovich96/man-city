import React from 'react';
import { CityLogo } from '../ui/icons';

const Footer = () => (
	<footer className='bck_blue'>
		<div className='footer_logo'>
			<CityLogo width='70px' height='70px' link={true} linkTo='/' />
		</div>
		<div className='footer_discl'>
			Manchester City 2020. All rights reserved
		</div>
	</footer>
);

export default Footer;
