import React from 'react';
import { Redirect } from '@reach/router';
import { Layout } from 'antd';

import Page from 'shared/components/page/index';

const { Content } = Layout;

class Route extends React.Component {
  render() {
    let { as: Component, ...props } = this.props;
    if (this.props.isAuth) {
      if (localStorage.getItem('token')) return <Redirect to="/towing" noThrow />;

      return (
        <Layout>
          <Content>
            <Component {...props} />
          </Content>
        </Layout>
      );
    } else {
      if (localStorage.getItem('token')) {
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

export default Route;
