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

export const updateOrder = ((id, status) => {
  return axios({
    method: 'PUT',
    url: `${base}/order/updateOrderStatus?id=${id}&status=${status}`
  }).then(res => res.data)
});