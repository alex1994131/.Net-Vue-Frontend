import { http } from '@/plugins/axios';

class valuesService {
  fetchCounts()
  {
    return http.get('Values')
  }
  fetchNotifications()
  {
    return http.get('Notification')
  }
  updateStatus(v)
  {
    
    return  http.post('Notification/updateStatus', v, { handlerEnabled: true })  
}
}
export default  new valuesService();


