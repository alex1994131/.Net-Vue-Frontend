import {http} from '@/plugins/axios';
import {MESSAGES, RESPONSES} from "@/helpers/constants";

class sectorsService {
  getSectors() {
    return http.get('Sector')
  }

  async addSector(sector) {
    try {
      let response = await http.post('Sector/AddSectors', sector, {handlerEnabled: true})
      return Promise.resolve({
        code: RESPONSES.SUCCESS_RESPONSE,
        sector: response.data
      })
    } catch (error) {
      return Promise.reject({
        message: error.message,
        status: 400,
        data: undefined
      })
    }
  }

  async addOrganization(organization) {
    try {
      let response = await http.post('Sector/AddOrganization', organization, {handlerEnabled: true})
      return Promise.resolve({
        message: MESSAGES.SUCCESS_RESPONSE,
        organizations: response.data
      })
    } catch (error) {
      return Promise.reject({
        message: error.message,
        status: 400,
        data: undefined
      })
    }
  }

  async AddOrgContact(contact,orgID) {
    try {
      let response = await http.post('Sector/AddOrgContact', contact,orgID, {handlerEnabled: true})
      return Promise.resolve({
        message: MESSAGES.SUCCESS_RESPONSE,
        contact: response.data
      })
    } catch (error) {
      return Promise.reject({
        message: error.message,
        status: 400,
        data: undefined
      })
    }
  }
  getOrganizations() {
    return http.get('Organization')
  }

  getOrgContact() {
    return http.get('Sector/GetOrganizationContacts')
  }

  addOrg(org) {
    return http.post('Organization', org)
  }

  async UpdateOrgDetails(details) {
    try {
      await  http.post('Sector/UpdateOrgDetails', details, { handlerEnabled: true })
      return Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS,
      })
    } catch (error) {
      return Promise.reject({
        message : error.message,
        status: 400,
        data: undefined
      })
    }
  }

}

export default new sectorsService();





