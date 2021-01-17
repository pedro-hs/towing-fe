import React from 'react';
import { Router } from '@reach/router';

import ListUsers from 'modules/users/list';
import NotFound from 'modules/shared/components/notFound/index';

const Users = () => (
  <Router>
    <ListUsers path="/list" />
    <NotFound default />
  </Router>
);

export default Users;
