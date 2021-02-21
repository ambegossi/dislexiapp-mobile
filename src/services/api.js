import axios from 'axios';

const api = axios.create({
  baseURL: 'https://2356250ea2df.ngrok.io',
});

export default api;
