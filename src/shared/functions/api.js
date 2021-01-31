import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { logout, getToken } from 'shared/functions/security';
import { refreshToken } from 'modules/authentication/api';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json', accept: 'application/json' },
});

api.interceptors.response.use(
  (config) => {
    if (config.headers['Content-Type'] === 'multipart/form-data') return config;
    if (config.params) config.params = camelizeKeys(config.params);
    if (config.data) config.data = camelizeKeys(config.data);

    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        await refreshToken(getToken());
        return;
      } catch (error) {
        notification.error({ message: 'Authorization fail' });
        logout();
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `JWT ${token}`;
    if (config.headers['Content-Type'] === 'multipart/form-data') return config;
    if (config.params) config.params = decamelizeKeys(config.params);
    if (config.data) config.data = decamelizeKeys(config.data);

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
