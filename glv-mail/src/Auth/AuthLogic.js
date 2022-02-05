const CLIENT_ID = "462028362119-ps2hcrcj7qst93kd7rgdbdjubbppuv5l.apps.googleusercontent.com";

function start() {
    window.gapi.client.init( {
        'client_id': CLIENT_ID,
        'scope':'https://mail.google.com'
    }).then(
        () => {console.log("OK")},
        (error) => console.log(error)
    )
}

function init() {
    window.gapi.load('client:auth2', start);
}

function signIn() {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signIn(
        {
            scope:"https://mail.google.com"
        }
    ).then(user => console.log(user.getAuthResponse()));
}

function signOut() {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(user => console.log("signed out"));
}

export {init, signIn, signOut}