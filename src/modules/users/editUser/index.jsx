import React from 'react';
import { notification, Divider, Col, Row, Button, Form, Input } from 'antd';

import { updateUser } from 'modules/users/api';
import { normalizeContact, normalizeCPF } from 'shared/functions/formatters';

const layout = {
  labelCol: {
    span: 3,
  },
};

const EditUser = (props) => {
  const editUser = async () => {
    try {
      const user = props.user;
      const contact = props.form.getFieldValue('contact') || props.user.contact;
      const normalizedUser = {
        cpf: normalizeCPF(user.cpf),
        contact: normalizeContact(contact),
        email: props.form.getFieldValue('email') || props.user.email,
        fullName: props.form.getFieldValue('fullName') || user.fullName,
      };
      await updateUser(normalizedUser);
      notification.success({ message: 'User updated' });
      props.afterSuccess();
    } catch (error) {
      notification.error({ message: 'Error while updating user' });
    }
  };

  return (
    <>
      <Form {...layout} id="editUser" form={props.form} onFinish={editUser} validateMessages={{ types: { email: 'Invalid email' } }}>
        <Form.Item label="CPF" name="cpf">
          <Input defaultValue={props.user.cpf} disabled />
        </Form.Item>
        <Form.Item label="Name" name="fullName">
          <Input defaultValue={props.user.fullName} />
        </Form.Item>
        <Form.Item
          name="contact"
          label="Contact"
          rules={[
            {
              pattern: /^\([1-9]{2}\)(?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
              message: 'Invalid. Example: (11)91111-1111',
            },
          ]}
        >
          <Input placeholder="(11)91111-1111" defaultValue={props.user.contact} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input placeholder="hello@mail.com" defaultValue={props.user.email} />
        </Form.Item>

        <Divider />
        <Row type="flex" align="middle" justify="end" gutter={8} style={{ marginBottom: 0, paddingBottom: 0 }}>
          <Col>
            <Form.Item>
              <Button onClick={() => props.onCancel()}>Cancel</Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" form="editUser" htmlType="submit" key="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditUser;
