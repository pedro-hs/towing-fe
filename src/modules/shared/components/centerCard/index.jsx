import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Title } = Typography;

const CenterCard = (props) => {
  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Col xs={22} md={20} lg={16} xl={10} xxl={6}>
        <Card
          title={
            <Title
              level={3}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {props.text}
            </Title>
          }
        >
          {props.children}
        </Card>
      </Col>
    </Row>
  );
};

export default CenterCard;
