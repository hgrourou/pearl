import axios from 'axios'
import { getCookie } from '@/util/cookie'
import router from '@/router'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
  if(config.method === 'post' || config.method === 'put') {
    config.data = JSON.stringify(config.data)
  }
  let token = getCookie('token')
  if(token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, (error, status, data) => {
  console.log(error)
  console.log(status)
  console.log(data)
    if (error) {
      // router.push({
      //   name: 'login',
      // })
    }
    return Promise.reject(error) 
});

export default axios