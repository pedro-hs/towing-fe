import React from 'react';
import { Redirect } from '@reach/router';
import { Layout } from 'antd';

import Page from 'shared/components/page/index';
import { getToken } from 'shared/functions/security';

const { Content } = Layout;

class AuthenticationHandler extends React.Component {
  render() {
    let { as: Component, ...props } = this.props;
    if (this.props.isAuth) {
      if (getToken()) return <Redirect to="/towing" noThrow />;

      return (
        <Layout>
          <Content>
            <Component {...props} />
          </Content>
        </Layout>
      );
    } else {
      if (getToken()) {
        return (
          <Page>
            <Component {...props} />
          </Page>
        );
      }

      return <Redirect to="/auth/login" noThrow />;
    }
  }
}

export default AuthenticationHandler;
