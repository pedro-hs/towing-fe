import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Card, Row, Col, notification } from 'antd';
import { navigate } from '@reach/router';

import { validateToken, changePassword } from 'modules/authentication/api';

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

const ChangePassword = (path) => {
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);

    try {
      await validateToken(path.email, path.token);
    } catch (error) {
      notification.error({ message: 'Invalid URL to change password' });
      navigate('/');
    }

    setLoading(false);
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    if (values.confirm !== values.password) {
      notification.error({ message: 'Password and confirm should be equal' });
      setLoading(false);
      return;
    }

    try {
      const response = await changePassword(values.password, path.token, path.email);
      notification.success({ message: 'Password changed' });
      navigate('/');
    } catch (error) {
      const password = error.response?.data?.password;

      if (password && password.length) {
        notification.error({ message: password[0] });
      } else {
        notification.error({ message: 'A problem occurs during the password change' });
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
              CHANGE PASSWORD
            </Title>
          }
        >
          <Form {...layout} onFinish={onFinish}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm"
              name="confirm"
              rules={[
                {
                  required: true,
                  message: 'Please input your password confirm!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ChangePassword;
