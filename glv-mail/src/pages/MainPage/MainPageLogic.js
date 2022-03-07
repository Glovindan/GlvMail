const GAPI = window.gapi;
const MAX_RESULTS = 20;

const loadClient = () => {
  return new Promise((resolve) => {
    GAPI.client
      .load("https://gmail.googleapis.com/$discovery/rest?version=v1")
      .then((response) => {
        resolve(response);
      });
  });
};

const loadMessages = (pageToken) => {
  return new Promise((resolve) => {
    GAPI.client.gmail.users.messages
      .list({
        userId: "me",
        maxResults: MAX_RESULTS,
        pageToken: pageToken,
      })
      .then((response) => {
        resolve(response);
      });
  });
};
export { loadClient, loadMessages};