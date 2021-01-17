import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { navigate } from '@reach/router';
import get from 'lodash/get';

import { validatePasswordToken, changePassword } from 'modules/authentication/api';
import CenterCard from 'modules/shared/components/centerCard';

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

const ChangePassword = (path) => {
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);

    try {
      await validatePasswordToken(path.email, path.token);
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
      await changePassword(values.password, path.token, path.email);

      notification.success({ message: 'Password changed' });
      navigate('/');
    } catch (error) {
      const password = get(error, ['response', 'data', 'password'], []);

      if (password && Array.isArray(password) && password.length) {
        password.forEach((item) => notification.error({ message: item }));
      } else {
        notification.error({ message: 'A problem occurs during the password change' });
      }
    }

    setLoading(false);
  };

  return (
    <CenterCard text="CHANGE PASSWORD" hasGrid>
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
    </CenterCard>
  );
};

export default ChangePassword;
