import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return (
    <Route
      {...rest}
      render={props => (isLoggedIn ? <Component {...props} /> : null)}
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func,
};
