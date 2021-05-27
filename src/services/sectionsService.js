import {http} from '@/plugins/axios';
import {RESPONSES, MESSAGES} from '@/helpers/constants'

class sectionsService {
  getDepartments() {
    return http.get('Departments');
  }


  async addDepartments(departments) {
    try {
      let response = await http.post('Departments/AddDepartments', departments, {handlerEnabled: true})
      return Promise.resolve({
        code: RESPONSES.SUCCESS_RESPONSE,
        sections: response.items
      })
    } catch (error) {
      return Promise.reject({
        message: error.message,
        status: 400,
        data: undefined
      })
    }
  }

  async addSections(sections) {
    try {
      let response = await http.post('Departments/AddSections', sections, {handlerEnabled: true})
      return Promise.resolve({
        message: MESSAGES.SUCCESS_RESPONSE,
        sections: response.items
      })
    } catch (error) {
      return Promise.reject({
        message: error.message,
        status: 400,
        data: undefined
      })
    }
  }


  getEmps() {
    return http.get('Employee')
  }

  addEmp(emp) {
    return http.post('Employee', emp)
  }

}

export default new sectionsService();





