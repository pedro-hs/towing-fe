import React from 'react';
import { Typography, Row } from 'antd';

const { Title } = Typography;

const AccessDenied = () => (
  <Row
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Title>You don't access to this page</Title>
  </Row>
);

export default AccessDenied;
