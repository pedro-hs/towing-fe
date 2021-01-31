import { navigate } from '@reach/router';

export const logout = () => {
  localStorage.removeItem('token');
  navigate('/auth/login');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const hasRoles = (roles) => {
  let token = getToken();
  token = token.split('.')[1];
  const user = JSON.parse(atob(token));

  return roles.includes(user.role);
};
