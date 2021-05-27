export default {
    // communicate directly with the state variables


    allApts : (state,apts) => state.apts = apts,
    selectedApt : (state,apt) => state.selectedApt = apt,
    searchKey : (state,key) => state.searchKey = key,
    setEditApt : (state,apt) => {state.apt = apt; state.editedApt = apt},
    setContents(state, payload){
        state.selectedApt.contents = payload.items;
      },

    newApt: (state, apt) => state.apts.push(apt),



 }
