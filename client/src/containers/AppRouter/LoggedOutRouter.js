import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const LoggedOutRoute = ({ component, path, exact }) => {


  return <Route path={path} exact={exact} component={component} />;
};

LoggedOutRoute.propTypes = {
  component: PropTypes.any,
  path: PropTypes.string,
  exact: PropTypes.bool,
};
export default LoggedOutRoute;