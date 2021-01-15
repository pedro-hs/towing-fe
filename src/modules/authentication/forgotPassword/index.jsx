import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Row, Col, notification } from 'antd';
import { navigate } from '@reach/router';

import { forgotPassword } from 'modules/authentication/api';

const tailLayout = {
  wrapperCol: {
    xs: { offset: 8 },
    sm: { offset: 10 },
  },
};

const { Title } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);

      notification.success({ message: 'Verify your email to create a new password' });
      navigate('/');
    } catch (error) {
      const email = error.response?.data?.email;

      if (email && email.length) {
        notification.error({ message: email[0] });
      } else {
        notification.error({ message: 'Error while request password reset' });
      }
    }
    setLoading(false);
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
              FORGOT MY PASSWORD
            </Title>
          }
        >
          <Form onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Continue
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
