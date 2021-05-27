export default {
    allApts: (state)=> {
        if (state.searchKey == ""){ return state.apts}
        else{ return state.apts.filter(apt => apt.name.includes(state.searchKey));}

        
    },

    getTableHeaders:(state) => state.headers,
  
    getApt : (state) => state.apt,
    selectedApt : (state) => state.selectedApt,


}



