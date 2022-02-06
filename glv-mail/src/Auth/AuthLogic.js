const CLIENT_ID = "462028362119-ps2hcrcj7qst93kd7rgdbdjubbppuv5l.apps.googleusercontent.com";
const SCOPES = 'https://mail.google.com';

function start() {
    window.gapi.client.init( {
        'client_id': CLIENT_ID,
        'scope': SCOPES
    }).then(
        () => {console.log("OK");},
        (error) => console.log(error)
    )
}

function init() {
    window.gapi.load('client:auth2', start);
}

function signIn() {
    const googleAuth = window.gapi.auth2.getAuthInstance();

    googleAuth.signIn().then(user => {
        console.log("signed in");
        redirect();
        isSignedIn()
    });
}

function signOut() {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(user => {
        console.log("signed out");
        isSignedIn()
    });
}

function redirect() {
    console.log("BOOM REDIRECTED")
}

async function isSignedIn() {
    console.log(await window.gapi.auth2.getAuthInstance().isSignedIn.get());
    return await window.gapi.auth2.getAuthInstance().isSignedIn.get();
}

export {init, signIn, signOut, isSignedIn, redirect}