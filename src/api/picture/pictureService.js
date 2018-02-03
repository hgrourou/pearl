import axios from '../interceptors'
import base from '../index'

export const uploadPicture = (formData, height, width, description) => { return axios({
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: formData,
  url: `${base}/picture/add?height=${height}&widt=${width}&description=${description}`,
}).then(res => res.data); };
