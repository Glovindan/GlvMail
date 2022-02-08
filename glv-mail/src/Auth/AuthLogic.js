const CLIENT_ID = "462028362119-ps2hcrcj7qst93kd7rgdbdjubbppuv5l.apps.googleusercontent.com";
const SCOPES = 'https://mail.google.com';

const initAPI = () => {
    window.gapi.client.init( {
        'client_id': CLIENT_ID,
        'scope': SCOPES
    }).then(
        () => {
            console.log("OK");
            if(isSignedIn()) {
                redirect()
            }
        },
        (error) => console.log(error)
    )
}

const loadAPI = () => {
    window.gapi.load('client', initAPI);
}

function signIn() {
    const googleAuth = window.gapi.auth2.getAuthInstance();

    googleAuth.signIn().then(user => {
        console.log("signed in");
        console.log(user.getBasicProfile().getId());
        if(isSignedIn()) {
            window.gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1").then(() => {
                const userId = user.getBasicProfile().getId(); //TODO:УДАЛИТЬ ОТСЮДА ИЛИ ЗАПИСАТЬ В ЛОКАЛСТОРАДЖ МБ
                let messageId = '';
                window.gapi.client.gmail.users.messages.list({userId: userId}).then(someVar => {
                    messageId = someVar.result.messages[0].id;
                    console.log(messageId)
                    window.gapi.client.gmail.users.messages.get({userId: userId, id: messageId}).then(message => {
                        console.log(message);
                    })
                })
                redirect();
            })
            //init GMAIL API
            //Maybe save
        }
    });
}

function signOut() {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(user => {
        console.log("signed out");
    });
}

function redirect() {
    console.log("BOOM REDIRECTED")
}

const isSignedIn = () => {
    console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    return window.gapi.auth2.getAuthInstance().isSignedIn.get();
}

export {loadAPI, signIn, signOut, isSignedIn, redirect}