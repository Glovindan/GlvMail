import {isSignedIn, loadAPI, signIn} from './AuthLogic';
import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

import styles from "./Auth.module.css"
import {Navigate} from "react-router-dom";

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogInClick = this.handleLogInClick.bind(this);
        this.onLogInStatusChange = props.onLogInStatusChange;
        this.state = {
            redirect: false,
            isLoggedIn: false
        };
    }

    handleLogInClick() {
        signIn().then(user => {
            this.onLogInStatusChange(isSignedIn());
            this.setState({redirect: true});
        })
    }

    render() {
        return(
            <div className={styles.mainContainer}>
                {this.state.redirect && (<Navigate to={`/messages`} replace={true}/>)}
                <Button variant="outline-dark" onClick={this.handleLogInClick}>Sign in with Google</Button>
            </div>
        );
    }
}

export default Auth;