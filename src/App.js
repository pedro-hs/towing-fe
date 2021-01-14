import React from 'react';
import 'antd/dist/antd.css';
import { Router } from '@reach/router';

import Authentication from 'modules/authentication/index';
import Towing from 'modules/towing/index';
import NotFound from 'modules/shared/components/notFound/index';
import Home from 'modules/shared/components/home/index';
import { tokenRefresh } from 'modules/authentication/api';

const App = () => (
  <Router>
    <Home path="/" />
    <Authentication path="auth/*" />
    <PrivateRoute as={Towing} path="towing/*" />
    <NotFound default />
  </Router>
);

class PrivateRoute extends React.Component {
  render() {
    let { as: Component, ...props } = this.props;
    const token = localStorage.getItem('token');
    return token && tokenRefresh(token) ? <Component {...props} /> : <Home path="/" />;
  }
}

export default App;
