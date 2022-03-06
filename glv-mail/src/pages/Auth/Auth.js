import {isSignedIn, loadAPI, signIn} from './AuthLogic';
import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

import styles from "./Auth.module.css"

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogInClick = this.handleLogInClick.bind(this);
        this.onLogInStatusChange = props.onLogInStatusChange;
        this.state = {isLoggedIn: false};
    }

    handleLogInClick() {
        signIn().then(user => {
            this.onLogInStatusChange(isSignedIn());
        })
    }

    render() {
        return(
            <div className={styles.mainContainer}>
                <Button variant="outline-dark" onClick={this.handleLogInClick}>Sign in with Google</Button>
            </div>
        );
    }
}

export default Auth;