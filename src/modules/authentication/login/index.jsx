import React from 'react';
import { Divider, Form, Input, Button, Row, Col, notification } from 'antd';
import { navigate } from '@reach/router';
import get from 'lodash/get';

import { login } from 'modules/authentication/api';
import CenterCard from 'shared/components/centerCard';

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

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password);

      notification.success({ message: 'Authentication success' });
      navigate('/towing');
    } catch (error) {
      form.resetFields(['password']);

      const isUnauthorized = get(error, ['response', 'data', 'nonFieldErrors'], '')
        .toString()
        .includes('Unable to log in with provided credentials');

      if (isUnauthorized) {
        notification.error({ message: 'Wrong user or password' });
      } else {
        notification.error({ message: 'There was a problem during authentication' });
      }
    }
  };

  return (
    <CenterCard text="Login" hasGrid>
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email',
            },
          ]}
        >
          <Input placeholder="hello@mail.com" />
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
              Forgot My Password
            </Button>
            <Button type="link" onClick={() => navigate('register')}>
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    </CenterCard>
  );
};

export default Login;
