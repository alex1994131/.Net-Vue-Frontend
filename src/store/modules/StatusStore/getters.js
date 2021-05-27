export default {

  getOrganizations : (state) => state.Orgs,
    GetSector : (state) => state.statusType,
    getStatus : (state) => state.status,
    getTaskStatus : (state) => state.status.filter(x => x.statusTypeId === 2)


}



