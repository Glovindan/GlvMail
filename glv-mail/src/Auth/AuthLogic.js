const CLIENT_ID = "462028362119-ps2hcrcj7qst93kd7rgdbdjubbppuv5l.apps.googleusercontent.com";
const SCOPES = 'https://mail.google.com';
const GAPI = window.gapi;

const loadAPI = async () => {
    //1. Загрузить библиотеки gapi.client и gapi.auth2
    //2. Инициализировать библиотеку gapi.client
    //3. ???
    //4. PROFIT
    return new Promise((res, rej) => {
        GAPI.load('client:auth2', () => {
            GAPI.client.init( {
                'client_id': CLIENT_ID,
                'scope': SCOPES
            }).then(
                () => {
                    res("OK");
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
        googleAuth.signOut().then(() => res("signed out"));
    })
}

const isSignedIn = () => {
    console.log(GAPI.auth2.getAuthInstance().isSignedIn.get());
    return  GAPI.auth2.getAuthInstance().isSignedIn.get()
}

export {loadAPI, signIn, signOut, isSignedIn}