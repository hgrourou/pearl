import axios from '../interceptors'
import base from '../index'

export const uploadPicture = (formData, height, width, description) => { return axios({
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: formData,
  url: `${base}/picture/add?height=${height}&widt=${width}&description=${description}`,
}).then(res => res.data); };

// this.axios.post('/avatar', image, {
//   headers: {
//     "Content-Type": "multipart/form-data"
//   }
// })

// export const uploadPicture = (formData, height, width, description) => { return axios.post(`${base}/picture/add?height=${height}&width=${width}&description=${description}`, formData, {
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded"
//   }
// }).then(res => res.data); };
