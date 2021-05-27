
export default {
  addTaskDialog: false,
  editTaskDialog: false,
  parentTask : null,
  assignTaskDialog: false,
  subTasks : [],
  closedTasks : [],
  searchResult : [],
  taskTypes : [],
  deparmtnetTasks : [],
  TaskEmpsRel:[],
  allTasks : [],
  incidentRelatedTasks : [],
  attachments : [],
  assignedTasks :[],
  selectedTask: null,
  OwnedTasks: [],
  TaskView:[]
  ,
  weights: [
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
    { id: 4, label: '4' },
    { id: 5, label: '5' },
    { id: 6, label: '6' }],
  importance: [
    { id: 1, label: 'سري للغاية' },
    { id: 2, label: 'سري' },
    { id: 3, label: 'مكتوم' },
    { id: 4, label: 'محدود' },

  ],
  urgancy: [
    {id: 1, label: "عادي"},
    {id: 2, label: "عاجل"},
    {id: 3, label: "عاجل جدا"}]
}
