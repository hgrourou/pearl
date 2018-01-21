import axios from 'axios'
import { getCookie } from '@/util/cookie'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
  if(config.method === 'post' || config.method === 'put') {
    config.data = JSON.stringify(config.data)
  }
  let token = getCookie('token')
  config.headers.Authorization = 'Bearer ' + token
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axios