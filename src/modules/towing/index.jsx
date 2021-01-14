import React from 'react';
import { Router } from '@reach/router';

import Dashboard from 'modules/towing/dashboard';
import NotFound from 'modules/shared/components/notFound/index';

const Towing = () => (
  <Router>
    <Dashboard path="/" />
    <NotFound default />
  </Router>
);

export default Towing;
