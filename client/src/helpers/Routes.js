import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router';
import AuthContext from '../helpers/AuthContext';

let AuthenticatedRoute = (props) => {
  // TODO: redirPath as qs
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated }) => isAuthenticated ? <Route {...props} /> : <Redirect to={`/login?next=${props.history.location.pathname}`} />}
    </AuthContext.Consumer>
  )
};
AuthenticatedRoute = withRouter(AuthenticatedRoute);

let AuthenticatedWithRoleRoute = ({ role, ...props }) => {
  return (
    <AuthContext.Consumer>
      {({ roles }) => role in roles ? <Route {...props} /> : <Redirect to={`/login?next=${props.history.location.pathname}`} />}
    </AuthContext.Consumer>
  )
};
AuthenticatedWithRoleRoute = withRouter(AuthenticatedWithRoleRoute);

const AdminRoute = (props) => <AuthenticatedWithRoleRoute role="ADMIN" {...props} />;


export { AuthenticatedRoute, AuthenticatedWithRoleRoute, AdminRoute }