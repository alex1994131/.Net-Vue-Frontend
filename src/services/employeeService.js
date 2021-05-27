import { http } from '@/plugins/axios';
import { RESPONSES , MESSAGES } from '@/helpers/constants'

class EmployeeService {

 async login(user)
  {
    try {
      let response = await http.post('Authenticate/login',user);
      console.log(response);
      return response.status == 200 && response.data.status == 200 ? Promise.resolve({
        code : RESPONSES.AUTHORISED_USER,
        status: response.status,
        token : response.data.token,
        claims : response.data.claims,
        userData : response.data.data
      }) : Promise.reject({ message : MESSAGES.UNAUTHORISED_USER});
    } catch (error) {
    
      return Promise.reject({
        message : error.message,
        status: 400,
        data: undefined
      })
    }
  }

  async setClaims(claims)
  {
    try {
      let response = await http.post('Roles/Claims',claims);
      return Promise.resolve({
        claims : response.items
      })
    } catch (error) {
      return Promise.reject({
        message : error.messaage,
        status: 400,
        data: undefined
      })
    }
  }
  async registerEmployee(user)
  {
    try {
      let response = await http.post('Authenticate/register',user);
      return  Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS
      }) ;
    } catch (error) {
      return Promise.reject({
        message : error.message,
        status: 400,
        data: undefined
      })
    }
  }

  async updatePassword(user)
  {
    try {
      let response = await http.put('Authenticate/updatePassword',user);
      return  Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS
      }) ;
    } catch (error) {
      return Promise.reject({
        message : error.message,
      })
    }
  }

  async updatePasswordByAdmin(user)
  {
    try {
      let response = await http.put('Authenticate/updatePasswordByAdmin',user);
      return  Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS
      }) ;
    } catch (error) {
      return Promise.reject({
        message : error.message,
      })
    }
  }

  async updateEmployee(user)
  {
    try {
      let response = await http.put('Authenticate/updateEmployee',user);
      return  Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS
      }) ;
    } catch (error) {
      return Promise.reject({
        message : error.message,
      })
    }
  }

  async changeUserStatus(user)
  {
    try {
      let response = await http.put('Authenticate/disableUser',user);
      return  Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS
      }) ;
    } catch (error) {
      return Promise.reject({
        message : error.message,
      })
    }
  }

  async changeUserPosition(user)
  {
    try {
      let response = await http.put('Authenticate/IsHeadOrNot',user);
      return  Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS
      }) ;
    } catch (error) {
      return Promise.reject({
        message : error.message,
      })
    }
  }


  async validateToken(user){
    try {
      // if the token is invalid , then the api will through a catch , so it will be in the catch block
      let response = http.get('Token');
      return Promise.resolve({code : RESPONSES.VALID_TOKEN });
    }catch(err){ 
      return Promise.reject({code : RESPONSES.INVALID_TOKEN });
    }
    
  }

  async saveRoles(roles)
  {
    try {
      let response = await http.post('Roles',roles);
      return Promise.resolve({
        roles : response.items
      });
    } catch (error) {
      return Promise.reject({
        message : error.message,
        status: 400,
        data: undefined
      })
    }
  }

  async fetchRoles(){
    try {
      let response = await http.get('Roles');
      return Promise.resolve({
        roles : response.items
      })
    }catch(err){ 
      return Promise.reject({
        message : err.message,
        status: 400,
        data: undefined
      });
    }
  }
  async getEmployees(){
    try {
      let response = await http.get('Employee');
      return  Promise.resolve({
        employees : response.items
      });
    }catch(err){ 
      return Promise.reject({
        message : err.message,
        status: 400,
        data: undefined
      });
    }
  }

  async fetchEmployee(){
    try {
      let response = await http.get('Employee');
      return Promise.resolve({
        Employee : response.items
      })
    }catch(err){ 
      return Promise.reject({
        message : err.message,
        status: 400,
        data: undefined
      });
    }
  }

}

export default  new EmployeeService();


