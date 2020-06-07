import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoutes = ({ user, component: Comp, ...rest }) => (
	<Route
		{...rest}
		component={(props) =>
			rest.restricted ? (
				user ? (
					<Redirect to='/dashboard' />
				) : (
					<Comp {...props} user={user} />
				)
			) : (
				<Comp {...props} user={user} />
			)
		}
	/>
);

PublicRoutes.propType = {
	user: PropTypes.object,
	component: PropTypes.element.isRequired,
};

export default PublicRoutes;
