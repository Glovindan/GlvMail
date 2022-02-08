import {loadAPI, signIn} from './AuthLogic';
import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

class Auth extends React.Component {
    componentDidMount() {
        loadAPI();
    }

    render() {
        return(
            <div>
                <Button variant="outline-dark" onClick={signIn}>Sign in with Google</Button>
                {/*<Button variant="outline-primary" onClick={signOut}>Sign out</Button>*/}
                {/*<Button variant="outline-primary" onClick={isSignedIn}>Check</Button>*/}
            </div>
        );
    }
}

export default Auth;