const CLIENT_ID = "462028362119-ps2hcrcj7qst93kd7rgdbdjubbppuv5l.apps.googleusercontent.com";
const SCOPES = 'https://mail.google.com';
const GAPI = window.gapi;

const loadAPI = async () => {
    return new Promise((res, rej) => {
        GAPI.load('client:auth2', () => {
            GAPI.client.init( {
                'client_id': CLIENT_ID,
                'scope': SCOPES
            }).then(
                () => {
                    res("API is loaded and initialized. Welcome!");
                },
                (err) => rej(err)
            )
        });
    });
}

const signIn = async () => {
    const googleAuth = GAPI.auth2.getAuthInstance();
    return new Promise((res) => {
        googleAuth.signIn().then(res);
    })
}

const signOut = async() => {
    const googleAuth = GAPI.auth2.getAuthInstance();
    return new Promise(res => {
        googleAuth.signOut().then(() => res(true));
    })
}

const isSignedIn = () => {
    return  GAPI.auth2.getAuthInstance().isSignedIn.get()
}

export {loadAPI, signIn, signOut, isSignedIn}