import axios from '../interceptors'
import base from '../index'

export const loadOrders = (pn) => { return axios({
  method: 'GET',
  url: `${base}/order/getAllOrders?page=${pn}`,
}).then(res => res.data); };

export const getOrder = id => { 
  return  axios({
    method: 'GET',
    url: `${base}/order/get?id=${id}`
  }).then( res => res.data);
};