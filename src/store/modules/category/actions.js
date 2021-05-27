import axios from 'axios';
import categoriesService from '@/services/categoriesService';



export default {
  async fetchCategories({ commit })
  {
    categoriesService.fetchCategories().then(resp =>{
      commit('setCategories',resp.data)
    })
  },
}
