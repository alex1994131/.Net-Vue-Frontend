export default {
    getOwnedTasks: (state)=>state.OwnedTasks,
    getAssignedTasks : (state) => state.assignedTasks,
    getParentTask : (state) => state.parentTask,
    getClosedTasks : (state)=> state.closedTasks,
    getSearchResult : (state)=> state.searchResult,
    getIncidentRelatedTasks : (state)=> state.incidentRelatedTasks,
    getWhight:(state) => state.weights,
    getImportance : (s) => s.importance,
    getUrgancy : (s) => s.urgancy,
    getAllTasks : (s) => s.allTasks,
    getSelectedTask : (s) => s.selectedTask,
    getDepartmentTasks : (s) => s.deparmtnetTasks,   
    gettasked_for : (s) => s.tasked_for,
    getsecureType : (s) => s.secureType,
    getSubTasks : (state)=>state.subTasks,
    getTaskTypes : (state)=>state.taskTypes,
    getDepartmentBar : (state)=>state.TaskEmpsRel,
    taskById: (state) => (id) => {
        return state.tasks.find(obj => obj.id === id);
      },
      GetTaskView:(state)=>state.TaskView,
}
