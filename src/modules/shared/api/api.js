import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json', accept: 'application/json' },
});

api.interceptors.response.use(
  (config) => {
    if (config.data && config.headers['content-type'] === 'application/json') {
      config.data = camelizeKeys(config.data);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };

    if (newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig;

    // config.headers.Authorization = `JWT ${localStorage.getItem('token')}`;

    if (config.params) newConfig.params = decamelizeKeys(config.params);
    if (config.data) newConfig.data = decamelizeKeys(config.data);

    return newConfig;
  },
  (error) => Promise.reject(error)
);

export const invalidCredentials = (requestError) => {
  return (
    requestError.response?.status == 400 &&
    requestError.response?.data?.non_field_errors?.toString().includes('Unable to log in with provided credentials')
  );
};

export default api;
