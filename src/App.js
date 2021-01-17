import React from 'react';
import 'antd/dist/antd.css';
import { Router, Redirect } from '@reach/router';

import Authentication from 'modules/authentication/index';
import Towing from 'modules/towing/index';
import NotFound from 'modules/shared/components/notFound/index';
import Users from 'modules/users/index';

const App = () => (
  <Router>
    <Route as={Authentication} path="auth/*" isAuth />
    <Route as={Towing} path="towing/*" />
    <Route as={Users} path="users/*" />
    <NotFound default />
  </Router>
);

class Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { as: Component, ...props } = this.props;

    if (this.props.isAuth) {
      if (localStorage.getItem('token')) {
        return <Redirect to="/towing" noThrow />;
      }

      return <Component {...props} />;
    } else {
      if (localStorage.getItem('token')) {
        return <Component {...props} />;
      }

      return <Redirect to="/auth/login" noThrow />;
    }
  }
}

export default App;
