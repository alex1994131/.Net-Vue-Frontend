import statusService from '@/services/statusService';

export default {

    changeSector: ({ commit }, Sector) => commit("setSector",Sector),
    removeStatus : ({ commit }, index) => commit("removeStatus",index),
    removeType : ({ commit }, index) => commit("removeType",index),

    async SaveSectors ({ commit }, statusType) {
      const response = await statusService.addStatusType(statusType);
      commit("SameSectors",response.data);
     },
     async fetchstatusTypeId({ commit })
    {
        const response = await statusService.getStatusType();
        commit('setStatusType',response.data)
    },

    async fetchStatuses({ commit })
    {
        const response = await statusService.getStatus();
        commit('SetStatus',response.data)
    },

     async AddOrg ({ commit }, status ) {
       const response = await statusService.addStatus(status);
       status.id = response.data.id;
      commit("saveOrg", status);
    },
}
