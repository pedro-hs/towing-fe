import React from 'react';
import 'antd/dist/antd.css';
import { Router } from '@reach/router';

import Authentication from 'modules/authentication/index';
import Towing from 'modules/towing/index';
import NotFound from 'modules/shared/components/notFound/index';
import Home from 'modules/shared/components/home/index';
import { validateAuthToken } from 'modules/authentication/api';

const App = () => (
  <Router>
    <Route as={Home} path="/" />
    <Route as={Authentication} path="auth/*" isAuth />
    <Route as={Towing} path="towing/*" />
    <NotFound default />
  </Router>
);

class Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenIsValid: false,
    };
  }

  async componentWillMount() {
    const token = localStorage.getItem('token');
    this.setState({ tokenIsValid: await validateAuthToken(token) });
  }

  render() {
    let { as: Component, ...props } = this.props;
    const { tokenIsValid } = this.state;

    if (this.props.isAuth) {
      if (tokenIsValid) {
        return <Home path="/" />;
      }

      return <Component {...props} />;
    } else {
      if (tokenIsValid) {
        return <Component {...props} />;
      }

      return <Home path="/" />;
    }
  }
}

export default App;
