
import { http } from '@/plugins/axios';

class StatusService {
  getStatusType()
  {
    return http.get('statusTypes')
  }
  addStatusType(statusType)
  {
    return http.post('statusTypes',statusType)
  }

  getStatus()
  {
    return http.get('Status')
  }
  addStatus(status)
  {
    return http.post('Status',status)
  }

}

export default  new StatusService();





