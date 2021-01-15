import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { navigate } from '@reach/router';

import { forgotPassword } from 'modules/authentication/api';
import CenterCard from 'modules/shared/components/centerCard';

const tailLayout = {
  wrapperCol: {
    xs: { offset: 8 },
    sm: { offset: 10 },
  },
};

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
    <CenterCard text="FORGOT MY PASSWORD">
      <Form onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: email,
            },
          ]}
        >
          <Input placeholder="hello@mail.com" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </CenterCard>
  );
};

export default ForgotPassword;
