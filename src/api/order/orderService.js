import axios from '../interceptors'
import base from '../index'

export const loadOrders = () => { return axios({
  method: 'GET',
  url: `${base}/order/getAllOrders`,
}).then(res => res.data); };