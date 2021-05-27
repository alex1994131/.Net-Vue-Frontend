import state from "../requsetIds/state";

export default {
  incidentsTable: (state)=> state.Incidents ,
  getSelectedIncident : (state) => state.selectedIncident,
  getIncident : (state) => state.Incidents,
  getNotification : (state) => state.Notification,
  getNotificationRequest : (state) => state.userIncedentRequest,
  getHandledNotfication : (state) => state.handledNotifications,
  getClosedIncidents : (state) => state.ClosedIncidents,
  incidentsTableHeader:(state) => state.Headers,
  getIncidentByTask:(state) => state.incidentsByTask,
  getCat:(state) => state.Cat,
  getSector : (state) => state.sector,
  getOrg : (state) => state.org,
  getUrgancy : (state) => state.Urgancey,
  getSver : (state) => state.Sver,
  getComments : state => state.comments,
  getfile : (state) => state.file,
  getIncidentsWithIps: (state) => state.incidentsWithIps,
  comments: state => index => {
    return state.comments.filter(el => el.postID === index);
  }
}
