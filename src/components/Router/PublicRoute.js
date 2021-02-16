import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../services/isLogin';
import PropTypes from 'prop-types';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLogin() && restricted ? <Redirect to="/home" /> : <Component {...props} />)}
  />
);

export default PublicRoute;

PublicRoute.propTypes = {
  component: PropTypes.func,
  restricted: PropTypes.bool,
};
