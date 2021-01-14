import React from 'react';
import { Typography, Row } from 'antd';

const { Title } = Typography;

const NotFound = () => (
  <Row
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Title>Page Not Found</Title>
  </Row>
);

export default NotFound;
