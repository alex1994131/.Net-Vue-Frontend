import { PAGES } from '../../../helpers/constants';

export default {
    getSection: (state) => state.sections,
    getEmployees : (state) => state.employees,
    getDepartments : (state) => state.departments,
    getResponse : (state) => state.response,
    getRoles : (state) => state.roles,
    getLogginStatus : (state) => state.isLoggedIn,
    getPages(){
        return Object.values(PAGES);
    },
    getUserRoles(){
        let roles = localStorage.getItem('claims');
        return JSON.parse(roles);
    },
    getUserDetails(){
        let details = localStorage.getItem('userRef');
        return JSON.parse(details);
    },

}
