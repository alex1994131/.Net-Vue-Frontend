export default {
    setSector : (state,sector) => state.SectorCode = sector,
    setStatusType : (state,status) => state.statusType=status,
    SetStatus : (state,statuses) => state.status=statuses,
    removeStatus  : (state,id) => state.status =  state.status.filter(org => org.id != id),
    removeType : (state,id) => state.statusType =   state.statusType.filter(con => con.Id != id),
    SameSectors: (state,statusType) => state.statusType = statusType,
    saveOrg (state , payload) {
       state.status.push(payload)
    }
 }
