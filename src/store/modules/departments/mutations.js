export default {
  setSector: (state, sector) => state.SectorCode = sector,
  setSections: (state, sections) => state.sections = sections,
  setDepartments: (state, departments) => state.departments = departments,
  setUsername: (state, username) => state.username = username,
  removeEmployee: (state, id) => state.employees = state.employees.filter(org => org.id !== id),
  removeDepartment: (state, id) => state.departments = state.departments.filter(org => org.id !== id),
  saveOrg(state, payload) {
    state.employees.push(payload)
  }
}
