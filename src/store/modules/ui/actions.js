import valuesService from '@/services/valuesService';

export default {

    async fetchCount ({commit})
    {
        commit('ui/setLoading' , true,{ root: true })
            try{
                const  resp  = await valuesService.fetchCounts();
                commit('setCounts',resp.item)
                commit('ui/setLoading' , false,{ root: true })
            }catch(err)
            {
                console.log("fetchCount",err)
                commit('ui/setLoading' , false,{ root: true })
            }
            

    },
    async fetchNotifications({commit})
    {
        commit('ui/setLoading' , true,{ root: true })
            try{
                const  resp  = await valuesService.fetchNotifications();
                commit('setNotes',resp.items)
                commit('ui/setLoading' , false,{ root: true })
            }catch(err)
            {
                console.log("fetchCount",err)
                commit('ui/setLoading' , false,{ root: true })
            }
            

    }, 
    async updateStatus({commit},obj)
    {
        commit('ui/setLoading' , true,{ root: true })
            try{
                const  resp  = await valuesService.updateStatus(obj);
                commit('setNotes',resp.items)
                commit('ui/setLoading' , false,{ root: true })
            }catch(err)
            {
                console.log("updateStatus",err)
                commit('ui/setLoading' , false,{ root: true })
            }
            

    },
    


}
