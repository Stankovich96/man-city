import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
const Stripes = () => {
	const stripes = [
		{
			backgroundColor: '#98c5e9',
			left: 120,
			rotate: 25,
			top: -260,
			delay: 0,
		},
		{
			backgroundColor: '#ffffff',
			left: 360,
			rotate: 25,
			top: -397,
			delay: 200,
		},
		{
			backgroundColor: '#98c5e9',
			left: 600,
			rotate: 25,
			top: -498,
			delay: 400,
		},
	];
	const showStripes = () =>
		stripes.map((stripe, i) => (
			<Animate
				key={i}
				show={true}
				start={{
					backgroundColor: '#ffffff',
					opacity: 0,
					left: 0,
					rotate: 0,
					top: 0,
				}}
				enter={{
					backgroundColor: `${stripe.backgroundColor}`,
					opacity: [1],
					left: [stripe.left],
					rotate: [stripe.rotate],
					top: [stripe.top],
					timing: { delay: stripe.delay, duration: 200, ease: easePolyOut },
					events: {
						end() {
							console.log('animation ended');
						},
					},
				}}>
				{({ backgroundColor, opacity, left, rotate, top }) => (
					<div
						className='stripe'
						style={{
							backgroundColor,
							opacity,
							transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`,
						}}></div>
				)}
			</Animate>
		));

	return <div className='featured_stripes'>{showStripes()}</div>;
};
export default Stripes;
