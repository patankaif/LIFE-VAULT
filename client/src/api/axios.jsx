import axios from 'axios';

const API = axios.create({
  baseURL: 'https://life-vault.onrender.com/',
  withCredentials: true
});

export default API;
