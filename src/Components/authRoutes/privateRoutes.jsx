import React from 'react';
import Routes from '../../Routes';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoutes = ({ user, component: Comp, ...rest }) => (
	<Route
		{...rest}
		component={(props) =>
			user ? <Comp {...props} user={user} /> : <Redirect to='/sign_in' />
		}
	/>
);

PrivateRoutes.propType = {
	user: PropTypes.object,
	component: PropTypes.element.isRequired,
};
export default PrivateRoutes;
