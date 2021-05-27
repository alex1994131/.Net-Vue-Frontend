import { http } from '@/plugins/axios';
import { RESPONSES ,MESSAGES } from '@/helpers/constants'


class TaskServices {
  async addTask(task) {
    try {
      await  http.post('Tasks', task, { handlerEnabled: true })
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

  async UpdateTask(task) {
    try {
      await  http.post('Tasks/UpdateTask', task, { handlerEnabled: true })
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
  async addEmpsToTask(task) {

      return await  http.post('Tasks/shareTask', task, { handlerEnabled: true })
    }
    fetchSelectedTasks(id)
  {
    return http.get('Tasks/'+id,{handlerEnabled: true})
  }

  fetchTasksOfDepartmentHead()
  {
    return http.get('Tasks/GetTasksByDepartment',{handlerEnabled: true})
  }
  fetchTasks()
  {
    return http.get('Tasks',{handlerEnabled: true})
  }

  fetchClosedTasks()
  {
    return http.get('Tasks/getClosedTasks',{handlerEnabled: true})
  }


  async SearchAllTasks(task) {
    try {
      return await  http.post('Tasks/SearchAllTasks', task, { handlerEnabled: true })
    } catch (error) {
      return Promise.reject({
        message : error.message,
      })
    }
  }



  async SearchAssignedTasks(task) {
    try {
      return await  http.post('Tasks/SearchAssignedTasks', task, { handlerEnabled: true })
    } catch (error) {
      return Promise.reject({
        message : error.message,
      })
    }
  }

  async SearchDepTasks(task) {
    try {
      return await  http.post('Tasks/SearchDepartmentTasks', task, { handlerEnabled: true })
    } catch (error) {
      return Promise.reject({
        message : error.message,
      })
    }
  }

  async SearchOwnedTasks(task) {
    try {
      return await  http.post('Tasks/SearchOwnedTasks', task, { handlerEnabled: true })
    } catch (error) {
      return Promise.reject({
        message : error.message,
      })
    }
  }

  fetchTaskView()
  {
    return http.get('Tasks/Taskview',{handlerEnabled: true})
  }
  fetchAllTasks()
  {
    return http.get('Tasks/fetchAllTasks',{handlerEnabled: true})
  }

  deleteUnstartedTask(id){
    return http.delete('Tasks/'+id)
  }
  fetchTasksByOwner()
  {
    return http.get('Tasks/TasksByOwner',{handlerEnabled: true})
  }
  getSubTasks(id)
  {
    return http.get('Tasks/subTasks?parentTask='+id)
  }
  fecthRelatedTasks(id) {
    return http.get('Tasks/relatedTask?incident='+id) // return  a promise
  }
  async updateStatus(payload)
  {
    try{
      let response = await  http.put('Tasks/updateStatus?statusId='+payload.statusId+'&&id='+payload.id)
      return  Promise.resolve({
        message : MESSAGES.SAVING_SUCCESS,
      });
    } catch(error){
      return Promise.reject({
        message : error.message,
        status: 400,
        data: undefined
      })
    }
  }
  closeTask(data){
    return http.post('Tasks/closeTask',data);
  }
  // saveCommenet(comment,taskId)
  // {
  //   return http.put('Tasks/comments?id='+taskId+'&&Com='+comment);
  // }
  updateProgress(id,prog)
  {
    return http.put('Tasks/progress?id='+id+'&&prog='+prog);
  }

  // SaveCommentsToTask(task) {
  //   return  http.post('Tasks/AddComments', task, { handlerEnabled: true })
  //  }

  addComments(task) {
    return  http.post('Tasks/AddTaskComments', task, { handlerEnabled: true })
 }

   async fetchComments(id){
    return await http.get('Tasks/GetTaskComments?taskId='+id)
  }

  async fetchTypes(id){
    return await http.get('Tasks/taskTypes');
  }
async fetchTaskEmpsRel(id){
    return await http.get('Tasks/TaskEmpsRel');
  }
  addReply(comment)
  {
   return  http.post('Tasks/addReplay', comment, { handlerEnabled: true })
  }

//  async fetchComments(id){
//   return await http.get('Tasks/GetTaskComments?taskId='+id)
// }
}

export default  new TaskServices();


