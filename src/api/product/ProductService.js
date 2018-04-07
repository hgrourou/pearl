import axios from '../interceptors'
import base from '../index'

export const loadProducts = (pn) => { return axios({
  method: 'GET',
  url: `${base}/product/getAllProducts?page=${pn}`,
}).then(res => res.data); };

// export const getOrder = id => { 
//   return  axios({
//     method: 'GET',
//     url: `${base}/order/get?id=${id}`
//   }).then( res => res.data);
// };

export const addProduct = ((form) => {
  return axios({
    method: 'POST',
    data: form,
    url: `${base}/product/add`
  }).then(res => res.data)
});

export const deleteProduct = (id) => {
  return axios({
    method: 'DELETE',
    url: `${base}/product/delete?id=${id}`
  }).then(res => res.data )
}