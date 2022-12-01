import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://g.tenor.com/v1/',
});

export default instance;
