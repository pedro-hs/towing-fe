import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { navigate } from '@reach/router';
import get from 'lodash/get';

import { forgotPassword } from 'modules/authentication/api';
import CenterCard from 'shared/components/centerCard';

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
      const email = get(error, ['response', 'data', 'email'], []);

      if (email && Array.isArray(email) && email.length) {
        email.forEach((item) => notification.error({ message: item }));
      } else {
        notification.error({ message: 'Error while request password reset' });
      }
    }

    setLoading(false);
  };

  return (
    <CenterCard text="Forgot My Password" hasReturn hasGrid>
      <Form onFinish={onFinish}>
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
