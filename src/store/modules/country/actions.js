import countriesService from '@/services/countryService';

export default {
    async fetchCountries({ commit })
    {
        const response = await countriesService.fetchCountries();
        commit('setCountries',response.data)
    },

    AddNewCountry : ({ commit }, country) => commit("newCountry",country),
    changeContenant : ({ commit }, Contenant) => commit("setContenant",Contenant),
    
}
