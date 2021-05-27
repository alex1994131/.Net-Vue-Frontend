export default {
    getIps:(state) => state.ips.filter(x => !x.isHandeled && x.isRequestVarify ),
    getIdentifidIps :  (state) => state.ips.filter(x => x.isHandeled ), 
    geIpaddress :  (state) => state.ipaddress, 
    

}



