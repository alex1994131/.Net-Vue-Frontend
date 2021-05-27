import axios from 'axios';

class attachmentService {
  async downloadAttachment(item)
  {

    if (item.attachment.is64base)
    {
      console.log('base64',item);
      var a = document.createElement("a"); 
      a.href = "data:" + item.attachment.type + ";base64," + item.attachment.content; 
      a.download = item.attachment.filename+"."+item.attachment.extension; 
      a.click();
    }
    else
    {

    axios({
      url: "https://localhost:44353/api/Attachment/"+item.attachment.id,
      method: "GET",
      responseType: "blob", // important
    })
      .then(function (response) {
        console.log('not base 64',item);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", item.attachment.filename+"."+item.attachment.extension);
        document.body.appendChild(link);
        link.click();
      })
      .catch(function (error) {
        console.log("Attachment Download",error)
      });
    }
  }

}

export default  new attachmentService();


