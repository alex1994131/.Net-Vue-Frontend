
import incidentService from "@/services/incidentsService";

export default {

  async setClosingIncident({ commit }, load) {
    return await incidentsService.closeIncident(load);
  },

  async fetchNotification({ commit }) {
    commit('ui/setLoading' , true,{ root: true })
    incidentService.fetchNotification().then(resp => {
      commit("setNotification", resp.data);
      commit('ui/setLoading' , false,{ root: true })
    }).catch(err =>{
      console.log('err',err)
      commit('ui/setLoading' , false,{ root: true })
    });
  },

  async fetchNotificationRequests({ commit }) {
    commit('ui/setLoading' , true,{ root: true })
    incidentService.fetchNotificationRequests().then(resp => {
      commit("setIncedentRequest", resp.items);
      commit('ui/setLoading' , false,{ root: true })
    }).catch(err =>{
      console.log('err',err)
      commit('ui/setLoading' , false,{ root: true })
    });
  },

  async fetchHandledNtifications({ commit }) {
    commit('ui/setLoading' , true,{ root: true })
    incidentService.fetchHandledNtifications().then(resp => {
      commit("setHandledNotifications", resp.data);
      commit('ui/setLoading' , false,{ root: true })
    }).catch(err => {
      console.log('err',err)
      commit('ui/setLoading' , false,{ root: true })
    });
  },


  async SearchNotes({ commit },searchObject) {
    commit('ui/setLoading' , true,{ root: true })
    await incidentService.Search(searchObject).then(resp => {
      commit('ui/setLoading' , false,{ root: true })
      commit("setHandledNotifications", resp.items);
    }).catch(err => {
      console.log('err',err)
      commit('ui/setLoading' , false,{ root: true })
    });
  },

  async fetchIncidents({ commit }) {
    commit('ui/setLoading' , true,{ root: true })
    incidentService.fetchIncidents().then(resp => {
      commit("setIncidents", resp.data);
      commit('ui/setLoading' , false,{ root: true })
    }).catch(err => {
      console.log('err',err)
      commit('ui/setLoading' , false,{ root: true })
    });
  },

  async fetchClosedIncidents({ commit }) {
    commit('ui/setLoading' , true,{ root: true })
    incidentService.fetchClosedIncidents().then(resp => {
      commit("setClosedIncidents", resp.data);
      commit('ui/setLoading' , false,{ root: true })
    }).catch(err => {
      console.log('err',err)
      commit('ui/setLoading' , false,{ root: true })
    });
  },


  async fetchIncidentById({ commit },id) {
    commit('ui/setLoading' , true,{ root: true })
   await incidentService.fetchIncidentById(id).then(resp => {
      commit("setSelectedIncident", resp.data);
      commit('ui/setLoading' , false,{ root: true })
    }).catch(err => {
      console.log('err',err)
      commit('ui/setLoading' , false,{ root: true })
    });
  },

  async addComment({ commit }, incident) {
    return await incidentService.addComment(incident)
   },

   async addUserForToIncident({ commit }, payload) {
    return await incidentService.addUserForToIncident(payload)
   },


   async sendResponse({ commit }, payload) {
    return await incidentService.sendResponse(payload)
   },

  async fetchComments({ commit }, id) {
    incidentService.fetchComments(id).then(resp => {
      let obj = { id : id, items : resp.data }
      commit("setComments", obj);
    }).catch(err => {
      console.log('fetchComments',err)
    });
  },

  addReplayToComment({commit},comment)
  {
    return incidentService.addReply(comment)
  },

  deleteIncident({ commit }, item) {
    commit("deleteIncident", item);
  },

  EditIncident({ commit }, incident) {
    return incidentService
      .EditIncident(incident)
      .then(resp => {
        return Promise.resolve({ message: resp.message });
      })
      .catch(err => {
        return Promise.reject({ message: err.message });
      });
  },

  fetchRelatedIncidents({commit },id){
    incidentService.fetchIncidentByTask(id).then(resp =>{
      commit("setSelectedIncident", resp.item);
    })
  },
  async getIncidentsWithIdRequests({commit}){
    return await incidentService.fetchIncidentsWithIpsRequests()
    .then(resp => {
      commit("setIncidentsWithIpRequests",resp.items);
      return Promise.resolve({ message: resp.message });
    })
    .catch(err => {
      return Promise.reject({ message: err.message });
    });
  },
  async closeIncident({ commit },report)
  {
    console.log(report)
    return await incidentService.closeIncident(report)
    .then(resp => {
      return Promise.resolve({ message: resp.message });
    })
    .catch(err => {
      return Promise.reject({ message: err.message });
    });
  }
  ,
  fetchData({ commit }) {
    incidentService.fetchConstants().then(resp => {
      commit("setSaverties", resp.data.saverity);
      commit("setCategories", resp.data.category);
      commit("setUrgencies", resp.data.urgancey);
    });
  },
  addIncident({ commit }, incident) {
    return incidentService
      .reportIncident(incident)
      .then(resp => {
        return Promise.resolve({ message: resp.message });
      })
      .catch(err => {
        return Promise.reject({ message: err.message });
      });
  },
  requestIpsIdentification({ commit },obj) {

   return  incidentService.requestIdentification(obj).then(resp => {
        return Promise.resolve({ message : "تم تقديم الطلب بنجاح" })
      },
      err => Promise.reject({ message : err })
    );
  },

  changeIncidnet({ commit },obj) {
    return incidentService.changeIncidentStatus(obj).then(
      resp => {
        return Promise.resolve({message : "تم تغيير إلى حادث"})
      },
      err => Promise.reject({message : err.message})
    );
  },

  addCategories({ commit }, category) {
    return incidentService.addCategory(category).then(
      resp => {
        commit("setCategories", resp.categories);
        return Promise.resolve("success");
      },
      err => Promise.reject(err)
    );
  },

  AddFile({ commit }, files) {
    commit("setfile", files);
  }
};
