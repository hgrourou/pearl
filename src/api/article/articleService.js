import axios from '../interceptors'
import base from '../index'

export const getAllArticles = (pn) => { 
  return axios({
    method: 'GET',
    url: `${base}/article/getAllArticles?pn=${pn}`,
  }).then(res => res.data)
};

export const addArticle = (article) => {
  return axios({
    method: 'POST',
    data: article,
    url: `${base}/article/add`,
  }).then(res => res.data)
};

export const deleteArticle = (articleId => {
  return axios({
    method: 'DELETE',
    url: `${base}/article/delete?id=${articleId}`,
  }).then(res => res.data)
});
