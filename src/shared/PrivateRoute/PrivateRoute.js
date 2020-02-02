import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  function isLoggedIn() {
    return !!localStorage.getItem('userToken');
  }
  return <Route {...rest} render={props => (
    isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
  )} /> 
};


export default PrivateRoute;