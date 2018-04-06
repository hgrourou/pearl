import axios from '../interceptors'
import base from '../index'

export const getAllCategories = () => { return axios({
  method: 'GET',
  url: `${base}/articleCategory/getAllArticleCategories`,
}).then(res => res.data); };

export const getProductCategories = () => { return axios({
  method: 'GET',
  url: `${base}/category/getAllCategories`,
}).then(res => res.data); };
