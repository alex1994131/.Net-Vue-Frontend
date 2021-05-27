export default {
    setEmployees : (state, employee) => state.employees = employee,   
    newEmployee : (state,emp) =>  state.employees.push(emp),
    setDialogStatus : (state,status) => state.addDialog = status,
    setLogginStatus : (state,loginStatus) => state.loggedin = loginStatus,
    setResponse : (state,resp) => state.response = resp,
    setMenue : (state,menue) => state.menue = menue,
    isLoggedIn : (state,value) => state.isLoggedIn = value,
    setRoles : (state,roles) => state.roles = roles,
    


    
 }