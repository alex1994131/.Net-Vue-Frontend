import { http } from '@/plugins/axios';
import { MESSAGES } from '@/helpers/constants'

class AptService {
  async addApt(apt) {
    try {
      let response = await  http.post('APTs', apt, { handlerEnabled: true })
      return  Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS
      });
    } catch (error) {
      return Promise.reject({
        message : error.message,
        status: 400,
        data: undefined
      })
    }
  }
  addContents(apt) {
  return  http.post('Apts/AddContents', apt, { handlerEnabled: true })
 }
 async fetchContents(id){
  return await http.get('Apts/GetContents?apt='+id)
}
  fetchApts()
  {
    return http.get('APTs')
  }
}

export default  new AptService();


