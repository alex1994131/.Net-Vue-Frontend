import sectorService from '@/services/sectorsService';
import taskService from "@/services/taskServices";

export default {
  async SaveSectors({commit}, sector) {
    return await sectorService.addSector(sector)
      .then(resp => {
        return Promise.resolve('تم الحفظ بنجاح');
      }).catch(err => Promise.reject(err.message));
  },

  async AddOrg({commit}, org) {
    const response = await sectorService.addOrg(org);
    commit("saveOrg", response.data);
  },
  async fetchSectors({commit}) {
    const response = await sectorService.getSectors();
    commit('setOrganization', [].concat.apply([], response.data.map(x => x.organizations)))
    commit('SameSectors', response.data)
  },

  async fetchOrganizations({commit}) {
    const response = await sectorService.getOrganizations();
    commit('setOrganization', response.data)
  },

  async fetchOrganContact({commit}) {
    const response = await sectorService.getOrgContact();
    commit('setOrgContact', response.data)
  },

  async SaveOrganization({commit}, organ) {
    return await sectorService.addOrganization(organ)
      .then(resp => {
        return Promise.resolve('تم الحفظ بنجاح');
      }).catch(err => Promise.reject(err.message));
  },

  async AddOrgContact({commit}, contact,orgId) {
    return await sectorService.AddOrgContact(contact,orgId)
      .then(resp => {
        return Promise.resolve('تم الحفظ بنجاح');
      }).catch(err => Promise.reject(err.message));
  },

  async UpdateOrgDetails({commit}, Deatail) {
    return await sectorService.UpdateOrgDetails(Deatail);
  },


}
