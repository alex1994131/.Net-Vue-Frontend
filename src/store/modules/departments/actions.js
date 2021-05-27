import sectionsService from '@/services/sectionsService';

export default {

  changeSector: ({commit}, Sector) => commit("setSector", Sector),
  removeDepartment: ({commit}, index) => commit("removeEmployee", index),


  async SaveSections({commit}, sections) {
    return await sectionsService.addSections(sections)
      .then(resp => {
        return Promise.resolve('تم الحفظ بنجاح');
      }).catch(err => Promise.reject(err.message));
  },

  async saveDepartments({commit}, departmetns) {
    return await sectionsService.addDepartments(departmetns)
      .then(resp => {
        return Promise.resolve('تم الحفظ بنجاح');
      }).catch(err => Promise.reject(err.message));
  },

  async addEmployee({commit}, payload) {
    const response = await sectionsService.addEmp(payload);
    commit("saveOrg", response.data);
  },

  async fetchDepartments({commit}) {
    const response = await sectionsService.getDepartments();
    commit('setSections', [].concat.apply([], response.items.map(x => x.sections)))
    commit('setDepartments', response.items)
  },


}
