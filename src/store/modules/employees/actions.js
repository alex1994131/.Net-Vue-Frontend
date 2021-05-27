import employeeService from "@/services/employeeService";
import { RESPONSES , MESSAGES } from '@/helpers/constants'

export default {
  async fetchRoles({ commit }) {
    commit('ui/setLoading' , true,{ root: true })
    return await employeeService.fetchRoles()
      .then(resp => {
        commit("setRoles", resp.roles);
        commit('ui/setLoading' , false, { root: true });
      }).catch(err => 
        {
          commit('ui/setLoading' , false, { root: true })
          return Promise.reject(err.message)
        });
  },
  async addEmployee({ commit }, emp) {
    const response = await axios.put(
      "http://localhost:44392/api/Employer",
      emp
    );
    commit("newEmployee", response.data);
  },

  async checkAuthorizationChacker({ commit }) {
   return employeeService.validateToken()
      .then(resp => {
         commit('isLoggedIn', true);
         return Promise.resolve('valid token')
      })
      .catch(err => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRef');
        commit('isLoggedIn', false);
        return Promise.reject('not valid token')
      });

  },
  async fetchEmployees({ commit })
  {
      const response = await employeeService.getEmployees();
      commit('setEmployees',response.employees)

  },
  async saveRoles({ commit }, user) {
    return employeeService.saveRoles(user)
      .then(resp => {
        commit("setRoles", resp.roles);
        return Promise.resolve(MESSAGES.SAVING_SUCCESS);
      }).catch(err => Promise.reject(err.message))
  },

  async updatePassword  ({ commit }, user) {
    return employeeService.updatePassword(user);
  },

  async updatePasswordByAdmin  ({ commit }, user) {
    return employeeService.updatePasswordByAdmin(user);
  },

  async changeUserStatus  ({ commit }, user) {
    return employeeService.changeUserStatus(user);
  },

  async changeUserPosition  ({ commit }, user) {
    return employeeService.changeUserPosition(user);
  },

  async registerEmployee({ commit }, user) {
    return employeeService.registerEmployee(user);
  },
  async updateEmployee({ commit }, user) {
    return employeeService.updateEmployee(user);
  },

  async setRolesClaims({ commit }, claims) {
    return employeeService.setClaims(claims)
      .then(resp => {
        //commit("setRoles", resp.roles);
        return Promise.resolve(MESSAGES.SAVING_SUCCESS);
      }).catch(err => Promise.reject(err.message))
  },

  async login({ commit }, user) {
    return employeeService.login(user)
      .then(resp => {
        localStorage.setItem("claims", JSON.stringify(resp.claims))
        localStorage.setItem("userRef",JSON.stringify(resp.userData));
        localStorage.setItem("token", resp.token);
        return Promise.resolve('success');
      }).catch(err => Promise.reject(err.message))
  },

  async fetchEmployee({ commit }) {
    commit('ui/setLoading' , true,{ root: true })
    return await employeeService.fetchEmployee()
      .then(resp => {
        commit("setEmployees", resp.data);
        commit('ui/setLoading' , false, { root: true });
      }).catch(err => 
        {
          commit('ui/setLoading' , false, { root: true })
          return Promise.reject(err.message)
        });
  },

};
