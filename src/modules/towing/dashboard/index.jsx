import React from 'react';
import { Typography, Row } from 'antd';

const { Title } = Typography;

const Dashboard = () => (
  <Row
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Title>Map</Title>
  </Row>
);

export default Dashboard;
