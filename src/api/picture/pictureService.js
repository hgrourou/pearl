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

