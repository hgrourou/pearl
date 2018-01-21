import axios from '../interceptors'
import base from '../index'

export const loadOrders = () => { return axios({
  method: 'GET',
  url: `${base}/order/getAllOrders`,
}).then(res => res.data); };

export const getOrder = id => { 
  return  axios({
    method: 'GET',
    url: `${base}/order/get?id=${id}`
  }).then( res => res.data);
};