import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Modal, Form, Typography, notification, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import CenterCard from 'modules/shared/components/centerCard';
import { formatCPF, formatContact, normalizeCPF } from 'modules/shared/functions/formatters';
import EditUser from 'modules/users/editUser/index';
import { listUsers, deleteUser } from 'modules/users/api';

const { Text } = Typography;

const ListUsers = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [dataSource, setDataSource] = useState([{}]);
  const [form] = Form.useForm();

  useEffect(async () => {
    await dataSourceLoad();
  }, []);

  const columns = [
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'name',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      key: 'edit',
      render: (user) => (
        <EditOutlined
          translate="edit"
          onClick={() => {
            form.resetFields();
            setSelectedUser(user);
          }}
        />
      ),
    },
    {
      key: 'delete',
      render: (user) => <DeleteOutlined translate="exclude" onClick={() => removeUser(user.cpf)} />,
    },
  ];

  const dataSourceLoad = async () => {
    try {
      const response = await listUsers();
      response.data.forEach((item) => {
        item.cpf = formatCPF(item.cpf);
        item.contact = formatContact(item.contact);
      });
      setDataSource(response.data);
    } catch (error) {
      notification.error('Error while list users');
    }
  };

  const removeUser = async (cpf) => {
    try {
      await deleteUser(normalizeCPF(cpf));
      notification.success({ message: 'User deleted' });
      dataSourceLoad();
    } catch (error) {
      notification.error({ message: 'Error while deleting user' });
    }
  };

  return (
    <CenterCard text="Users" hasReturn>
      <Table dataSource={dataSource} columns={columns} style={{ whiteSpace: 'pre' }} />

      <Modal
        title={
          <Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} strong>
            Edit User
          </Text>
        }
        okText="Save"
        visible={Object.keys(selectedUser || {}).length}
        onCancel={() => setSelectedUser({})}
        footer={null}
      >
        <EditUser
          user={selectedUser}
          form={form}
          onCancel={() => {
            setSelectedUser({});
            notification.info({ message: 'Edition canceled' });
          }}
          afterSuccess={() => {
            setSelectedUser({});
            dataSourceLoad();
          }}
        />
      </Modal>
    </CenterCard>
  );
};

export default ListUsers;
