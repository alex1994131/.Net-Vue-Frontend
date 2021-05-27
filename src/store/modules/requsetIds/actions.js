import axios from 'axios';
import IpRequestService from '@/services/IpRequestService';

export default {
  // newId({ commit }, item) {
  //   commit("addnewId", item);
  // },

  add({ commit }, item) {
    IpRequestService.add(item).then(result =>{commit("alldata", result.data)})},//post

  getAllIp({commit}){
    commit('ui/setLoading' , true,{ root: true })
    IpRequestService.getAllIp()
    .then(result =>{
      commit("alldata", result.items)
      commit('ui/setLoading' , false,{ root: true })
    }).catch( err => {
      commit('ui/setLoading' , false,{ root: true })
      console.log(err);
    })
  },
  async fetchIncidentById({ commit }) {
    commit('ui/setLoading' , true,{ root: true })
    IpRequestService.fetchIncidentById().then(resp => {
      commit("setIncidentById", resp.data);
      commit('ui/setLoading' , false,{ root: true })
    });
  },


  fetchIpsOfIncident({commit},id){
    commit('ui/setLoading' , true,{ root: true })
    IpRequestService.getIdsByIncident(id)
    .then(result =>{
      commit("setIpAddress", result.items)
      commit('ui/setLoading' , false,{ root: true })
    }).catch( err => {
      commit('ui/setLoading' , false,{ root: true })
      console.log(err);
    })
  },

  VarifyIp({commit} , item){
    return  IpRequestService.VarifyIp(item).then(resp => {
      return  Promise.resolve({ message : "تم حفظ البيانات بنجاح" })
    },
    err => Promise.reject({ message :err })
  );
  },

  delete({commit}){
    IpRequestService.delete().then(result =>{commit("alldata", result.data)})},//delete


}

