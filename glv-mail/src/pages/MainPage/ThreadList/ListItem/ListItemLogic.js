const extractField = (headersArr, fieldName)  =>{
  return headersArr.find((header) => header.name === fieldName).value;
}

const decodeEntity = (inputStr) => {
  let textarea = document.createElement("textarea");
  textarea.innerHTML = inputStr;
  return textarea.value;
}

const b64_to_utf8 = (str) => {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(escape(atob(str)));
}

const parseEmailHeader = (fromStr) => {
  const email = fromStr.match(/[^@<\s]+@[^@>\s]+/g).join('');
  const name = fromStr.replace(/[^@<\s]+@[^@>\s]+/g,"").replace(/["<>]/g,"").trim();

  if(name.length > 0) {
    return {
      name:name,
      email:email
    };
  }

  return {
    name:email,
    email:email
  };
}

export {decodeEntity, extractField, b64_to_utf8, parseEmailHeader};