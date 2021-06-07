import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component, path, exact }) => {
  const { isLogged } = useSelector(state => state.auth);

  if (!isLogged) return <Redirect to="/login" />;

  return <Route path={path} exact={exact} component={component} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  path: PropTypes.string,
  exact: PropTypes.bool,
};
export default PrivateRoute;