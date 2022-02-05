import {init, signIn, signOut} from './AuthLogic';
import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        init();
    }

    render() {
        return(
            <div>
                <Button variant="outline-dark" onClick={signIn}>Sign in with Google</Button>
                <Button variant="outline-light" onClick={signOut}>Sign out</Button>
            </div>
        );
    }
}

export default Auth;