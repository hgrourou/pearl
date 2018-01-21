import axios from '../interceptors'
import base from '../index'

export const requestLogin = data => { return axios({
  method: 'PUT',
  url: `${base}/user/token`,
  headers: {
    contentType: "application/json",
  },
  data: data
}).then(res => res.data); };