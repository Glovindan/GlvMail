const extractField = (headersArr, fieldName)  =>{
  return headersArr.find((header) => header.name.toLowerCase() === fieldName.toLowerCase()).value;
}

const decodeEntity = (inputStr) => {
  let textarea = document.createElement("textarea");
  textarea.innerHTML = inputStr;
  return textarea.value;
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

export {decodeEntity, extractField, parseEmailHeader};