import axios from '../interceptors'
import base from '../index'

export const getAllArticles = (pn) => { return axios({
  method: 'GET',
  url: `${base}/article/getAllArticles?pn=${pn}`,
}).then(res => res.data); };
