import api from 'modules/shared/api/api';

export const loginUri = () => 'token-auth/';
export const login = async (email, password) => {
  const response = await api.post(loginUri(), { email, password });
  localStorage.setItem('token', response.data.token);
};

export const tokenRefreshUri = () => 'token-auth/';
export const tokenRefresh = async (token) => {
  try {
    const response = await api.post(tokenRefreshUri(), { token });
    if (response && response.data && response.data.token) return true;
    return false;
  } catch (error) {
    return false;
  }
};
