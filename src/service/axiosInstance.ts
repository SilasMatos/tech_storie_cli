
import axios from "axios";

import Cookies from 'js-cookie';
import { showModalUnauthorized } from '../context/UnauthorizedContext';

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

declare global {
  interface ImportMeta extends ImportMetaEnv { }
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {

      showModalUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
