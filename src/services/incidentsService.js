import { http } from '@/plugins/axios';
import { MESSAGES } from '@/helpers/constants'

class IncidentsService {
  async reportIncident(incident) {

     try {
      let response = await  http.post('Incident', incident, { handlerEnabled: true })
      return  Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS,
      }) ;
    } catch (error) {
      return Promise.reject({
        message : error.message,
        status: 400,
        data: undefined
      })
    }
  }


 closeIncident(report) {
  return  http.post('Incident/closeIncident',report, { handlerEnabled: true })
}

async fetchIncidentById(id) {
  return await http.get('Incident/getIncidentById?id='+id)
}

changeIncidentStatus(obj) {
    let resp =  http.post('Incident/changeIncidentStatus', obj, { handlerEnabled: true })
    return resp;
 }
 requestIdentification(obj) {
  return  http.post('IdentificationRequest', obj, { handlerEnabled: true })
}
addUserForToIncident(payload) {
    return  http.post('Incident/addUsersToAssignment', payload, { handlerEnabled: true })
 }
 addComment(incident) {
  return  http.post('Incident/comments', incident, { handlerEnabled: true })
}

sendResponse(payload) {
  return  http.post('Incident/IncidentAssignmentResponse', payload, { handlerEnabled: true })
}

  fetchIncidentByTask(id) {
    return  http.get('Incident/incidentsByTask?id='+id, { handlerEnabled: true })
  }

 addReply(comment)
 {
  return  http.post('Incident/addReplay', comment, { handlerEnabled: true })
 }
  fetchIncidents() {
    return http.get('Incident/incidents') // return  a promise
  }
  fetchNotification() {
    return http.get('Incident/notifications') // return  a promise
  }
  fetchNotificationRequests() {
    return http.get('Incident/UserIncidentsRequests') // return  a promise
  }
  fetchHandledNtifications() {
    return http.get('Incident/handledNotifications') // return  a promise
  }
  fetchIncidentsWithIpsRequests(){
    return http.get('IdentificationRequest/getIncidentsWithIdRequests') // return  a promise
  }
  async Search(searchObject) {
    return  await http.post('Incident/Search', searchObject, { handlerEnabled: true })
  }
  fetchClosedIncidents() {
    return http.get('Incident/closed_incidents') // return  a promise
  }
  async fetchComments(id){
    return await http.get('Incident/GetComments?incident='+id)
  }
  fetchConstants() { return http.get('Incident/incidentData'); }

  async addCategory(category) {
    let response  = await  http.post('Incident/category', category, { handlerEnabled: true });
    return  Promise.resolve({
      categories : response.items,
      message : MESSAGES.SAVING_SUCCESS,
    });
  } catch (error) {
    return Promise.reject({
      message : error.message,
      status: 400,
      data: undefined
    })
 }
 fetchCategories() {
  return http.get('Incident/categories')
}
async EditIncident(incident) {
  try {
   let response = await  http.post('Incident/EditRequest', incident, { handlerEnabled: true })
   return  Promise.resolve({
     message : MESSAGES.SAVING_SUCCESS,
   }) ;
 } catch (error) {
   return Promise.reject({
     message : error.message,
     status: 400,
     data: undefined
   })
 }
}

}
export default new IncidentsService();


