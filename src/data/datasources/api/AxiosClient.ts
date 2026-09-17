// src/data/datasources/api/axiosClient.ts
import axios, { AxiosInstance, AxiosError } from 'axios';

const BASE_URL = 'http://10.0.2.2:8000/api/v1';

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Intercepteur de réponse : centralise la gestion d'erreurs
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.log('[API ERROR]', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('[NETWORK ERROR]', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosClient;