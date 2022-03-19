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

const parseEmailBody = async (payload, messageId) => {
  //Что-то мне подсказывает что это ГИГАНТСКИЙ КОСТЫЛЬ
  console.log(payload)
  if (payload.mimeType === "multipart/related") {
    //parse html
    const data = payload.parts.find((el) => el.mimeType === "text/html").body
      .data;
    let body = convertBase64(data);
    console.log(body)
    //parse attachments
    const attachmentsData = payload.parts
      .filter((el) => /image\//.test(el.mimeType))
      .map((el) => {
        return {
          id: el.body.attachmentId,
          cid: extractField(el.headers, "Content-ID").replace(/[<>]/g, ""),
          type: el.mimeType,
        };
      });

    const attachments = await getFullAttachmentsData(
      attachmentsData,
      messageId
    );
    attachments.forEach((attachment) => {
      body = body.replace(
        `cid:${attachment.cid}`,
        `data:${attachment.type};base64, ${attachment.data}`
      );
    });
    return body;
  }

  if (payload.mimeType === "multipart/alternative") {
    const data = payload.parts.find((el) => el.mimeType === "text/html").body
      .data;
    return convertBase64(data);
  }

  //TODO: Сделать отображение прикреплений
  if (payload.mimeType === "multipart/mixed") {
    const data = payload.parts.find((el) => el.mimeType === "text/html").body
      .data;

    return convertBase64(data);
  }
  //TODO: Добавить поддержку остальных MIME типов

  const data = payload.body.data;
  return convertBase64(data);
};

const getFullAttachmentsData = async (attachmentsData, messageId) => {
  const result = await Promise.all(
    attachmentsData.map(async (attachment) => {
      const data = await getAttachment(attachment.id, messageId);
      return {
        data: replaceGmailBase64(data.result.data),
        cid: attachment.cid,
        type: attachment.type,
      };
    })
  );

  return result;
};

const getAttachment = (attachmentId, messageId) => {
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
