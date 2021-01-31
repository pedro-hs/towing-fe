import React from 'react';
import 'antd/dist/antd.css';
import { Router } from '@reach/router';

import Authentication from 'modules/authentication/index';
import Towing from 'modules/towing/index';
import Users from 'modules/users/index';
import AuthenticationHandler from 'shared/components/authenticationHandler/index';
import PermissionHandler from 'shared/components/permissionHandler/index';

const App = () => (
  <Router>
    <AuthenticationHandler as={Authentication} path="auth/*" isAuth />
    <AuthenticationHandler as={AuthenticatedRoutes} path="/*" />
  </Router>
);

const AuthenticatedRoutes = () => (
  <Router>
    <Towing path="towing/*" default />
    <Towing path="towing/*" />
    <PermissionHandler roles={['admin']} path="users/*">
      <Users path="users/*" />
    </PermissionHandler>
  </Router>
);

export default App;
