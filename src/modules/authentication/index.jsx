import React from 'react';
import { Router } from '@reach/router';

import Login from 'modules/authentication/login/index';
import NotFound from 'modules/shared/components/notFound/index';

const Authentication = () => (
  <Router>
    <Login path="login" />
    <NotFound default />
  </Router>
);

export default Authentication;
