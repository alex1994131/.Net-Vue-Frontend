export default {
    setOwnedTasks: (state, tasks) => state.OwnedTasks = tasks,
    setDefaultSelectedItem: (state) => state.selectedTask = state.defaultTask,
    setIncidentRelatedTasks: (state,tasks) => state.incidentRelatedTasks = tasks,
    setAssignTaskDialog: (state, status) => state.assignTaskDialog = status,
    setAllTasks : (state, tasks) => state.allTasks = tasks,
    setSearchResult : (state, tasks) => state.searchResult = tasks,
    addComment: (state, comment) => state.selectedTask.comments.push(comment),
    setSelectedItem: (state, task) => state.selectedTask = task,
    setTasksOfDepartment : (state,items) => state.deparmtnetTasks = items,
    setAssignedTasks:  (state, tasks) => state.assignedTasks = tasks,
    setAssignedClosedTasks:  (state, tasks) => state.closedTasks = tasks,
    subTasks :  (state, tasks) => state.subTasks = tasks,
    setAttachment : (state , att) => state.attachments = att,
    changeTaskStatus (state , taskparam) {
      let task  = state.OwnedTasks.find(x => taskparam.taskid === x.id);
      task.status.id = taskparam.statusid;
      task.status.isOpen = false;
    },
    setTaskComments(state, payload){
        state.selectedTask.taskComments = payload.items;
      },

      setTaskType(state, payload){
        state.taskTypes = payload;
      },
      setTaskEmpsRel(state, payload){
        state.TaskEmpsRel = payload;
      },
    selectedTask : (state,task) => state.selectedTask  = task,
    setTaskView(state, payload){
        state.TaskView = payload;
      },

}
