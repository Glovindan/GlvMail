const GAPI = window.gapi;

const extractField = (headersArr, fieldName)  =>{
  return headersArr.find((header) => header.name.toLowerCase() === fieldName.toLowerCase()).value;
}

const replaceGmailBase64 = (str) => {
  return str.replace(/-/g, "+").replace(/_/g, "/");
};

const convertBase64 = (str) => {
  str = replaceGmailBase64(str);
  return decodeURIComponent(escape(atob(str)));
};

const parseEmailBody = (payload, messageId) => {
  //Что-то мне подсказывает что это ГИГАНТСКИЙ КОСТЫЛЬ
  if (payload.mimeType === "multipart/related") {
    //parse html
    const data = payload.parts.find((el) => el.mimeType === "text/html").body.data;
    let body = convertBase64(data);

    //parse attachments
    const attachmentsData = payload.parts
      .filter((el) => /image\//.test(el.mimeType))
      .map((el) => {
        return {attachmentId: el.body.attachmentId, contentID: extractField(el.headers, "Content-ID")}
      });
    console.log(attachmentsData);

    let attachments = [];

    attachmentsData.forEach((attachmentData) => {
      getAttachment(messageId, attachmentData.attachmentId).then((response) => {
        const attachmentData = replaceGmailBase64(response.data);
        const contentID = attachmentsData.contentID.replace(/[<>]/, "");
        attachments.push({
          attachmentData: attachmentData,
          contentID: contentID,
        });
        console.log(attachments);
      });
    });

    console.log(attachments);
    console.log(body.match(/cid:[\d]+/g));
    return body;
  }

  if(payload.mimeType === "multipart/alternative") {
    const data = payload.parts.find((el) => el.mimeType === "text/html").body.data;
    return convertBase64(data);
  }

  const data = payload.body.data;
  return convertBase64(data);
};

const getAttachment = (messageId, attachmentId) => {
  return new Promise((resolve) => {
    resolve(
      GAPI.client.gmail.users.messages.attachments.get({
        userId: "me",
        messageId: messageId,
        id: attachmentId,
      })
    );
  });
};

const getMessageData = (messageId) => {
  return new Promise((resolve) => {
    resolve(
      GAPI.client.gmail.users.messages.get({
        userId: "me",
        id: messageId,
      })
    );
  });
};
export { convertBase64, parseEmailBody, getMessageData };
