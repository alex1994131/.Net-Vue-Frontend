export default {
    addnewId: (state, Idintifys) => state.Idintify.push(Idintifys),
    
    alldata : (state , allIdintifys) => state.ips = allIdintifys,

    setIpAddress : (state , ipIdintifys) => state.ipaddress = ipIdintifys,

    add: (state, dd) => {
        state.Idintify.subsId=dd.subsId;
        state.Idintify.ownerSub=dd.ownerSub;
        state.Idintify.Cid=dd.Cid;
        state.Idintify.phoneNum=dd.phoneNum;
    },

    setIncidentById(state,Incidents){
        state.IncidentById = Incidents
      }
}
