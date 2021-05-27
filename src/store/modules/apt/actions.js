import aptService from '@/services/aptService';

export default {
    setKey : ({commit}, key) => commit("searchKey",key),

    selectedApt : ({ commit }, apt) => commit("selectedApt",apt),

    async save({commit },apt)
    {
        return aptService.addApt(apt);
    },
    async fetchApts({ commit })
    {
        commit('ui/setLoading' , true,{ root: true })
        const response = await aptService.fetchApts();
        commit('allApts',response.items)
        commit('ui/setLoading' , false,{ root: true })
    },
    async fetchContents({ commit }, id) {

            aptService.fetchContents(id).then(resp => {
                let obj = { id : id, items : resp.item.contents }
                commit("setContents",obj);
              }).catch(err => {
                  console.log('fetchContents',err)
              });
      },

    addContents({ commit }, apt) {
       return aptService.addContents(apt)
      },

    AddCompanyName :({ commit },company) => commit("AddCompanyName",company),
    removeCompanyName  : ({ commit }, index) => commit("removeCompanyName",index),
    AddtoolName :({ commit },tool) => commit("AddtoolName",tool),
    removetoolName  : ({ commit }, index) => commit("removetoolName",index),
    AddSectorName :({ commit },sector) => commit("AddSectorName",sector),
    removeSectorName  : ({ commit }, index) => commit("removeSectorName",index),

}
