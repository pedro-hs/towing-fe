import React from 'react';
import { Typography, Row, Button } from 'antd';
import { navigate } from '@reach/router';

const { Title } = Typography;

const Dashboard = () => {
  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Title>Map</Title>
      <Button onClick={() => navigate('/users/list')}>List</Button>
    </Row>
  );
};

export default Dashboard;
