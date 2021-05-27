import taskService from '@/services/taskServices';

export default {

  saveAttachment: ({commit}, attachments) => commit('setAttachment', attachments),

  async fetchDepartmentTasks({commit}) {
    commit('ui/setLoading', true, {root: true})
    taskService.fetchTasksOfDepartmentHead().then(resp => {
      commit('setTasksOfDepartment', resp.items)
      commit('ui/setLoading', false, {root: true})
    }).catch(err => {
      commit('ui/setLoading', false, {root: true})
      console.log('fetchDepartmentTasks', err);
    });
  },


  async SearchAllTasks({commit}, obj) {
    commit('ui/setLoading', true, {root: true})
    taskService.SearchAllTasks(obj).then(resp => {
      commit('setSearchResult', resp.items)
      commit('ui/setLoading', false, {root: true})
    }).catch(err => {
      commit('ui/setLoading', false, {root: true})
      console.log('Search', err);
    });
  },

  async SearchDepTasks({commit}, obj) {
    commit('ui/setLoading', true, {root: true})
    taskService.SearchDepTasks(obj).then(resp => {
      commit('setTasksOfDepartment', resp.items)
      commit('ui/setLoading', false, {root: true})
    }).catch(err => {
      commit('ui/setLoading', false, {root: true})
      console.log('Search', err);
    });
  },

  async SearchOwnedTasks({commit}, obj) {
    commit('ui/setLoading', true, {root: true})
    taskService.SearchOwnedTasks(obj).then(resp => {
      commit('setTaskView', resp.items)
      commit('ui/setLoading', false, {root: true})
    }).catch(err => {
      commit('ui/setLoading', false, {root: true})
      console.log('Search', err);
    });
  },

  async SearchAssignedTasks({commit}, obj) {
    commit('ui/setLoading', true, {root: true})
    taskService.SearchAssignedTasks(obj).then(resp => {
      commit('setAssignedClosedTasks', resp.items)
      commit('ui/setLoading', false, {root: true})
    }).catch(err => {
      commit('ui/setLoading', false, {root: true})
      console.log('Search', err);
    });
  },


  async fetchOwnedTasks({commit}) {
    commit('ui/setLoading', true, {root: true})
    taskService.fetchTasksByOwner().then(resp => {

      commit('setOwnedTasks', resp.items)
      commit('ui/setLoading', false, {root: true})
    }).catch(err => {
      commit('ui/setLoading', false, {root: true})
      console.log('fetchOwnedTasks', err);
    });
  },
  fetchSelectedTasks({commit}, id) {
    taskService.fetchSelectedTasks(id).then(resp =>
      commit("setSelectedItem", resp.item)
    ).catch(err => console.log("fetchSelectedTasks", err))
  },
  fetchAssignedTasks({commit}) {
    commit('ui/setLoading', true, {root: true})
    taskService.fetchTasks().then(resp => {
      commit('ui/setLoading', false, {root: true})
      commit('setAssignedTasks', resp.items)
    }).catch(err => {
      console.log("fetchAssignedTasks", err);
      commit('ui/setLoading', false, {root: true})
    })
  },

  fetchAssignedClosedTasks({commit}) {
    commit('ui/setLoading', true, {root: true})
    taskService.fetchClosedTasks().then(resp => {
      commit('ui/setLoading', false, {root: true})
      commit('setAssignedClosedTasks', resp.items)
    }).catch(err => {
      console.log("fetchAssignedClosedTasks", err);
      commit('ui/setLoading', false, {root: true})
    })
  },


  fetchTaskviews({commit}) {
    taskService.fetchTaskView().then(resp => {
      commit('ui/setLoading', false, {root: true})
      commit('setTaskView', resp.items)
    }).catch(err => {
      console.log("fetchTaskviews", err);
      commit('ui/setLoading', false, {root: true})
    })
  },

  setSelectedTask({commit}, item) {
    commit("setSelectedItem", item)
  },
  async addTask({commit}, task) {
    return await taskService.addTask(task);
  },

  async UpdateTask({commit}, task) {
    return await taskService.UpdateTask(task);
  },
  async updateStatus(payload) {
    return await taskService.updateStatus(payload);
  },
  async shareTask({commit}, task) {
    return await taskService.addEmpsToTask(task);
  },

  async updateProgress({commit}, task) {
    const resp = await taskService.updateProgress(task.id, task.prog);
  },
  async fetchIncidentTasks({commit}, id) {

    try {
      const response = await taskService.fecthRelatedTasks(id);

      commit('setIncidentRelatedTasks', response.items);
    } catch (err) {
    }
  },

  async fetchSubTasks({commit}, id) {
    const response = await taskService.getSubTasks(id);
    commit("subTasks", response.data);
  },
  async setClosingReport({commit}, load) {
    return await taskService.closeTask(load);
  },
  async setTaskToStarted({commit}, task) {
    return await taskService.updateStatus(task).then(resp => {
      return Promise.resolve({message: resp.message});
    }, err => Promise.reject({message: err.message}));
  },

  async deleteTask({commit}, task) {
    return await taskService.deleteUnstartedTask(task)
  },

  selectedTask: ({commit}, task) => commit("selectedTask", task),


  addTaskComment({commit}, task) {
    return taskService.addComments(task)
  },

  async fetchTaskComments({commit}, id) {
    taskService.fetchComments(id).then(resp => {
      let obj = {id: id, items: resp.item.taskComments}
      commit("setTaskComments", obj);
    }).catch(err => {
      console.log('fetchTaskComments', err)
    });
  },

  async fetchAllTasks({commit}) {
    commit('ui/setLoading', true, {root: true})
    taskService.fetchAllTasks().then(resp => {
      commit("setAllTasks", resp.items);
      commit('ui/setLoading', false, {root: true})
    }).catch(err => {
      commit('ui/setLoading', false, {root: true})
      console.log('fetchTaskType', err)
    });
  },

  async fetchTaskType({commit}) {
    commit('ui/setLoading', true, {root: true})
    taskService.fetchTypes().then(resp => {

      commit("setTaskType", resp.items);
      commit('ui/setLoading', false, {root: true})
    }).catch(err => {
      commit('ui/setLoading', false, {root: true})
      console.log('fetchTaskType', err)
    });
  },
  async fetchTaskEmpsRel({commit}) {

    taskService.fetchTaskEmpsRel().then(resp => {
      commit("setTaskEmpsRel", resp.items);
    }).catch(err => {
      console.log('fetchTaskEmpsRel', err)
    });
  },
  addReplayToComment({commit}, comment) {
    return taskService.addReply(comment)
  },

}
