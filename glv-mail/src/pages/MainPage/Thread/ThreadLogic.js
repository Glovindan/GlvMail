const b64_to_utf8 = (str) => {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(escape(atob(str)));
}

const parseEmailBody = (payload) => {
  // if(payload.mimeType === "multipart/alternative") {
  if(/multipart/.test(payload.mimeType)) {
    const data = payload.parts.find(el => el.mimeType === 'text/html').body.data;
    console.log(data);
    const dataEncoded = b64_to_utf8(data);

    return dataEncoded;
  }

  const data = payload.body.data;
  const dataEncoded = b64_to_utf8(data);
  return dataEncoded;
}

export {b64_to_utf8,parseEmailBody}