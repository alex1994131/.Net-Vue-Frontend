import attachmentService from '@/services/attachmentService';


export default {
    async downloadAttachment({ commit },item)
    {
        return await attachmentService.downloadAttachment(item);
    },


}
