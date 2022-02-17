import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
  <Route
    {...rest}
    render={props => (restricted ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

export default PublicRoute;

PublicRoute.propTypes = {
  component: PropTypes.func,
  restricted: PropTypes.bool,
};
