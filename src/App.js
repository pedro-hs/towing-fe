import React from 'react';
import 'antd/dist/antd.css';
import { Router } from '@reach/router';

import Authentication from 'modules/authentication/index';
import Towing from 'modules/towing/index';
import Users from 'modules/users/index';
import Route from 'shared/components/route/route';

const App = () => (
  <Router>
    <Route as={Authentication} path="auth/*" isAuth />
    <Route as={Towing} path="towing/*" />
    <Route as={Towing} path="towing/*" default />
    <Route as={Users} path="users/*" />
  </Router>
);

export default App;
