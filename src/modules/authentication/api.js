import api from 'shared/functions/api';
import { setToken } from 'shared/functions/security';

export const loginUri = () => 'token/auth/';
export const login = async (email, password) => {
  const response = await api.post(loginUri(), { email, password });
  setToken(response.data.token);
};

export const refreshTokenUri = () => 'token/refresh/';
export const refreshToken = async (token) => {
  const response = await api.post(refreshTokenUri(), { token });
  setToken(response.data.token);
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
