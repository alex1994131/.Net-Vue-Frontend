import { http } from '@/plugins/axios';
import { RESPONSES, MESSAGES } from '@/helpers/constants'

class IpRequestService {


    add(ip) {
        return http.post('IdentificationRequest', ip)
    }

    getIdsByIncident(incidentId) {
        return http.get('IdentificationRequest/'+incidentId)
    }

    getIds(Subid) {
        return http.get('IdentificationRequest/'+Subid)
    }

    getAllIp(ip) {
        return http.get('IdentificationRequest', ip)
    }

    VarifyIp(ip) {
        return http.put('IdentificationRequest', ip)
    }

    delete(ip) {
        return http.delete('IdentificationRequest'+ ip)
    }
    fetchIncidentById() {
        return http.get('IdentificationRequest/GetIncidentById')}

}

export default new IpRequestService();