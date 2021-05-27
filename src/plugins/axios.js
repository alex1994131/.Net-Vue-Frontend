import Vue from 'vue'
import axios from 'axios'
import { MESSAGES } from '@/helpers/constants'

Vue.prototype.$http = axios

let axiosInstance = axios.create({
  baseURL: `https://localhost:44353/api`
 
})

const isHandlerEnabled = (config = {}) => {
  return Object.prototype.hasOwnProperty.call(config,'handlerEnabled') && !config.handlerEnabled ?
    false : true
}

const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    let user = localStorage.getItem('token');
    if (user) {
      request.headers['Authorization'] = 'Bearer ' + user
    }
  }
  return request
}

axiosInstance.interceptors.request.use(
  request => requestHandler(request)
)


const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    // Handle errors
  }
  try {
console.log(error);
    if (error.response.status === 405 || error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRef');
      localStorage.removeItem('claims');      
    }
    }catch(msg){
     
      return Promise.reject({ message : "تعذر الوصول إلى الخادم"})
    }
  return Promise.resolve({ status : error.response.status});
}

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }

  if (response.status == undefined){
     
  }
  if (response.status == 200){
  if( response.data.status == 200)
  {
    return response.data.data.isSuccessResponseObject ? Promise.resolve({
      item : response.data.data.instance,
      items : response.data.data.items,
      message : MESSAGES.SAVING_SUCCESS,
      id : response.data.data.id
    }) : Promise.resolve(response)
  }

  if (response.data.status == 320 )
  {
    return response.data.isFailedResponseObject ? Promise.reject({ message : response.data.message}) : Promise.reject("Unknown Error");
  }
}

return response;

}


axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)

export const http = axiosInstance
