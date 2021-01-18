import React from 'react';
import { Layout, Menu, notification } from 'antd';
import { navigate } from '@reach/router';

import { logout } from 'shared/functions/auth';

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

  const adminMenu = () => (
    <>
      <Menu.Item key="towing" onClick={() => navigate('/towing')}>
        Map
      </Menu.Item>
      <Menu.Item key="users-list" onClick={() => navigate('/users/list')}>
        Users
      </Menu.Item>
      {logoutMenu()}
    </>
  );

  return (
    <Layout>
      <Header style={{ background: '#fff' }}>
        <Menu mode="horizontal" style={{ float: 'right' }}>
          {adminMenu()}
        </Menu>
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default Page;
