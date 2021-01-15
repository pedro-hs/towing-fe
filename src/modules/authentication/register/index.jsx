import React from 'react';
import { Form, Input, notification, Button } from 'antd';
import { navigate } from '@reach/router';

import CenterCard from 'modules/shared/components/centerCard';
import { insertUser } from 'modules/authentication/api';

const layout = {
  labelCol: {
    span: 6,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const user = { ...values.user, isStaff: true };

    if (user.password !== values.confirm) {
      notification.error({ message: 'Password and confirm should be equal' });
      return;
    }

    user.cpf = user.cpf.replace(/\./g, '').replace('-', '');
    user.mobileNumber = user.mobileNumber.replace('(', '').replace(')', '').replace('-', '');

    try {
      const response = await insertUser(user);
      notification.success({ message: 'Created with success' });
      navigate('/');
    } catch (error) {
      const data = error.response?.data;

      if (Array.isArray(data)) {
        Object.keys(data).forEach((index) => {
          data[index].forEach((item) => notification.error({ message: item }));
        });
      } else {
        notification.error({ message: 'Error while register user' });
      }
    }
  };

  return (
    <CenterCard text="REGISTER">
      <Form {...layout} form={form} onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={['user', 'fullName']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Your name here" />
        </Form.Item>

        <Form.Item
          name={['user', 'cpf']}
          label="CPF"
          rules={[
            {
              required: true,
            },
            {
              pattern: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/,
              message: 'Invalid. Example: 123.456.789-10',
            },
          ]}
        >
          <Input placeholder="458.573.445-03" />
        </Form.Item>

        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input placeholder="hello@mail.com" />
        </Form.Item>

        <Form.Item
          name={['user', 'mobileNumber']}
          label="Mobile Number"
          rules={[
            { required: true },

            {
              pattern: /^\([1-9]{2}\)(?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
              message: 'Invalid. Example: (34)98811-9922',
            },
          ]}
        >
          <Input placeholder="(34)98811-9922" />
        </Form.Item>

        <Form.Item
          label="Password"
          name={['user', 'password']}
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

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </CenterCard>
  );
};

export default Register;