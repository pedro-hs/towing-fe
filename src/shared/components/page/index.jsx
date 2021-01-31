import React from 'react';
import { Layout, Menu, notification } from 'antd';
import { navigate } from '@reach/router';

import { logout, hasRoles } from 'shared/functions/security';

const { Header, Content } = Layout;

const Page = (props) => {
  const logoutMenu = () => (
    <Menu.Item
      key="logout"
      style={{ color: 'red' }}
      onClick={() => {
        notification.success({ message: 'Logouted' });
        logout();
      }}
    >
      Logout
    </Menu.Item>
  );

  const menu = () => (
    <>
      {logoutMenu()}
      {hasRoles(['admin']) && (
        <Menu.Item key="users-list" onClick={() => navigate('/users')}>
          Users
        </Menu.Item>
      )}
      <Menu.Item key="towing" onClick={() => navigate('/towing')}>
        Map
      </Menu.Item>
    </>
  );

  return (
    <Layout>
      <Header style={{ background: '#fff' }}>
        <Menu mode="horizontal">{menu()}</Menu>
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default Page;
