import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { notification } from 'antd';
import { navigate } from '@reach/router';

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
        const response = await refreshToken(localStorage.getItem('token'));
        localStorage.setItem('token', response.data.token);
        return response;
      } catch (error) {
        notification.error({ message: 'Authorization fail' });
        localStorage.removeItem('token');
        navigate('/auth/login');
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) config.headers.Authorization = `JWT ${localStorage.getItem('token')}`;
    if (config.headers['Content-Type'] === 'multipart/form-data') return config;
    if (config.params) config.params = decamelizeKeys(config.params);
    if (config.data) config.data = decamelizeKeys(config.data);

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
