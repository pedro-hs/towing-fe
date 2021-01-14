import React, { useEffect } from 'react';
import { Divider, Form, Input, Button, Typography, Card, Row, Col, notification } from 'antd';
import { navigate } from '@reach/router';

import { login } from 'modules/authentication/api';
import { invalidCredentials } from 'modules/shared/api/api';

const layout = {
  labelCol: {
    span: 4,
  },
};
const tailLayout = {
  wrapperCol: {
    xs: { offset: 8 },
    md: { offset: 11 },
  },
};

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, []);

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password);
      notification.success({ message: 'Authentication success' });
      navigate('/');
    } catch (error) {
      form.resetFields(['password']);

      if (invalidCredentials(error)) {
        notification.error({ message: 'Authentication fail' });
      } else {
        notification.error({ message: 'There was a problem during authentication' });
      }
    }
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
              level={2}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Towing
            </Title>
          }
        >
          <Form {...layout} form={form} onFinish={onFinish}>
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

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>

            <Divider />
            <Row type="flex" justify="end">
              <Col>
                <Button type="link" onClick={() => navigate('forgot-password')}>
                  Forgot my password
                </Button>
                <Button type="link" onClick={() => navigate('register')}>
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
