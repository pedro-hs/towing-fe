import { navigate } from '@reach/router';

export const logout = () => {
  localStorage.removeItem('token');
  navigate('/auth/login');
};

export const isAuthenticated = () => {
  return localStorage.getItem('token');
};
