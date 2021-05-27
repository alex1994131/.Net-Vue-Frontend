export default {
  deleteIncident(state, Incident){
    state.Incidents = state.Incidents.filter( obj => {
      if (obj.id == Incident.id) return false;
      return true;
      });
  },

  setIncidentsByTask : (state,p) => state.incidentsByTask = p,
  addIncidence(state, Incidence) {
    state.Incidents.push(Incidence)
  },
  setIncidentsWithIpRequests : (state,incs) => state.incidentsWithIps = incs,

  setNotification(state,Incidents){
    state.Notification = Incidents
  },
  setIncedentRequest(state,Incidents){
    state.userIncedentRequest = Incidents
  },
  setHandledNotifications(state,Incidents){
    state.handledNotifications = Incidents
  },
  setClosedNotification(state,Incidents){
    state.ClosedNotification = Incidents
  },
  setClosedIncidents(state,Incidents){
    state.ClosedIncidents = Incidents
  },
  setIncidents(state,Incidents){
    state.Incidents = Incidents
  },
  setIncident(state,Incidents) {
    state.IncidentsCat = Incidents
  },
  setSelectedIncident(state , id){
    state.selectedIncident = id
  },
  newIncidnt(state,incident){
    state.IncidentsCat.push(incident)
  },
  addComment(state, comments){
    //state.comments.push(comments)
    state.incidentsByTask.comments = comments

  },
  setComments(state, payload){
    state.selectedIncident.comments = payload.items
  },
  setfile(state, file){
    state.file = file
  },
  setSaverties :(state, sav) =>   state.Sver = sav,
  setCategories(state, cat){
    state.Cat = cat
  },
  setUrgencies(state, urg){
    state.Urgancey = urg
  },
}
