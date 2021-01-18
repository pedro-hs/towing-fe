import React from 'react';
import { Card, Row, Col, Typography, Button, Divider } from 'antd';

const { Title } = Typography;

const CenterCard = (props) => {
  const grid = () => {
    if (props.hasGrid) return { xs: 22, md: 20, lg: 16, xl: 10, xxl: 6 };
    return {};
  };
  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Col {...grid()}>
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
          {props.hasReturn ? (
            <>
              <Divider />
              <Row display="flex" justify="end">
                <Col>
                  <Button type="link" onClick={() => window.history.back()}>
                    Return
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CenterCard;
