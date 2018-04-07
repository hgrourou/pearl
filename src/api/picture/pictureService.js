import axios from '../interceptors'
import base from '../index'
import $ from 'jquery'
import { getCookie } from '@/util/cookie'

export const uploadPicture = (formData, height, width, description) => { 
  let token = getCookie('token')
  // let settings = {
  //   url: `${base}/picture/add?height=0&width=0&description=${description}`,
  //   type: "POST",
  //   headers: {
  //     "authorization": `Bearer ${token}`,
  //   },
  //   data: formData,
  // };
  $.ajax({
    url: `${base}/picture/add?height=0&width=0&description=${description}`,
    type: "POST",
    headers: {
      "authorization": `Bearer ${token}`,
    },
    data: formData,
  }).done(function (response) {

    console.log(response)
  });
};

export const uploadPicture1 = (formData, height, width, description) => { 
  // let config = {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }
  // let result = axios.post(`${base}/picture/add?height=0&width=0&description=${description}`, formData, config)
  // console.log(result)
  // return result
  
  return axios({
    url: `${base}/picture/add?height=0&width=0&description=${description}`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    data: formData,
    method: "POST",
  }).then(res => res.data); 
};
  // let token = getCookie('token')
  // let settings = {
  //   url: `${base}/picture/add?height=0&width=0&description=${description}`,
  //   type: "POST",
  //   headers: {
  //     "authorization": `Bearer ${token}`,
  //     'Content-type': 'application/x-www-form-urlencoded'
  //   },
  //   data: formData,
  // };
  


