import api from 'modules/shared/api/api';

export const loginUri = () => 'token/auth/';
export const login = async (email, password) => {
  const response = await api.post(loginUri(), { email, password });
  localStorage.setItem('token', response.data.token);
};

export const tokenRefreshUri = () => 'token/refresh/';
export const tokenRefresh = async (token) => {
  const response = await api.post(tokenRefreshUri(), { token });
  localStorage.setItem('token', response.data.token);
};

export const forgotPasswordUri = (email) => `password/reset/${email}/`;
export const forgotPassword = async (email) => await api.post(forgotPasswordUri(email), { email });

export const changePasswordUri = () => 'password/reset/confirm/';
export const changePassword = async (password, token, email) => {
  const data = { password, token, email };
  await api.post(changePasswordUri(), data);
};

export const validatePasswordTokenUri = () => 'password/reset/validate_token/';
export const validatePasswordToken = async (email, token) => await api.post(validatePasswordTokenUri(), { token });
