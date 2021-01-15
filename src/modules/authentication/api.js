import api from 'modules/shared/api/api';

export const loginUri = () => 'token-auth/';
export const login = async (email, password) => {
  const response = await api.post(loginUri(), { email, password });
  localStorage.setItem('token', response.data.token);
};

export const tokenVerifyUri = () => 'token-verify/';
export const tokenVerify = async (token) => {
  try {
    const response = await api.post(tokenVerifyUri(), { token });
    return true;
  } catch (error) {
    return false;
  }
};

export const forgotPasswordUri = (email) => `password-reset/${email}/`;
export const forgotPassword = async (email) => await api.post(forgotPasswordUri(email), { email });

export const changePasswordUri = () => 'password-reset/confirm/';
export const changePassword = async (password, token, email) => {
  const data = { password, token, email };
  await api.post(changePasswordUri(), data);
};

export const validateTokenUri = () => 'password-reset/validate_token/';
export const validateToken = async (email, token) => await api.post(validateTokenUri(), { token });
