import {isSignedIn, loadAPI, signIn, signOut} from './AuthLogic';
import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogInClick = this.handleLogInClick.bind(this);
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    async componentDidMount() {
        loadAPI().then(
            (res) => {
                console.log(res);
                this.setState({isLoggedIn: isSignedIn()})
            },
            (err) => console.log(err)
        );
    }


    handleLogInClick() {
        signIn().then(user => {
            console.log(user.getBasicProfile().getId());
            this.setState({isLoggedIn: isSignedIn()})
        })
    }

    handleLogOutClick() {
        signOut().then(str => {
            console.log(str);
            this.setState({isLoggedIn: isSignedIn()})
        })
    }

    render() {
        const loginStatus = this.state.isLoggedIn;

        let button;
        if(loginStatus) {
            button = <Button variant="outline-primary" onClick={this.handleLogOutClick}>Sign out</Button>
        } else {
            button = <Button variant="outline-dark" onClick={this.handleLogInClick}>Sign in with Google</Button>
        }

        return(
            <div>
                {button}
                {/*<Button variant="outline-dark" onClick={this.handleLogInClick}>Sign in with Google</Button>*/}
                {/*<Button variant="outline-primary" onClick={signOut}>Sign out</Button>*/}
                {/*<Button variant="outline-primary" onClick={isSignedIn}>Check</Button>*/}
            </div>
        );
    }
}

export default Auth;