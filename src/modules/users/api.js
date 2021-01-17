import api from 'modules/shared/api/api';

export const baseUri = () => 'users/';

export const insertUser = async (user) => await api.post(baseUri(), { ...user });

export const listUsers = async () => await api.get(baseUri());

export const updateUser = async (data) => {
  const cpf = data.cpf;
  delete data.cpf;
  await api.put(`${baseUri()}${cpf}/`, data);
};

export const deleteUser = async (cpf) => await api.delete(`${baseUri()}${cpf}/`);
