import axios from 'axios';
import { BACKEND_URL } from './config/url';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'content-Type': 'application/json',
  },
});

export default api;
