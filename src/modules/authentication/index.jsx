import React from 'react';
import { Router } from '@reach/router';

import Login from 'modules/authentication/login/index';
import ForgotPassword from 'modules/authentication/forgotPassword/index';
import ChangePassword from 'modules/authentication/changePassword/index';
import NotFound from 'modules/shared/components/notFound/index';

const Authentication = () => (
  <Router>
    <Login path="login" />
    <ForgotPassword path="forgot-password" />
    <ChangePassword path="change-password/:email/:token" />
    <NotFound default />
  </Router>
);

export default Authentication;
