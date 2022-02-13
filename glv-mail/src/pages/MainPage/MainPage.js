import React from "react";
import styles from "./MainPage.module.css"
import ThreadList from "./ThreadList/ThreadList";
import {Button} from "react-bootstrap";
import {isSignedIn, signOut} from "../Auth/AuthLogic";
const GAPI = window.gapi;

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.onLogInStatusChange = props.onLogInStatusChange;

        this.state = ({messageList: []})
    }

    handleLogOutClick() {
        signOut().then(str => {
            this.onLogInStatusChange(isSignedIn());
        })
    }

    componentDidMount() {
        GAPI.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1").then(() => {
            const userId = GAPI.auth2.getAuthInstance().currentUser.get().getId(); //Достать id юзера

            GAPI.client.gmail.users.messages.list({userId: userId}).then(someVar => {
                this.setState({messageList: this.state.messageList.concat(someVar.result.messages)})
                console.log("in promise:",this.state.messageList.length)
            })//Список сообщений
        })
    }

    render() {

        console.log("in render:",this.state.messageList.length)

        return (
            <div className={styles.container}>
                <div className={styles.menu}>A</div>
                <div className={styles.main}>
                    <ThreadList messageList={this.state.messageList}/>
                </div>
                <div className={styles.rightThing}>
                    <Button variant="outline-primary" onClick={this.handleLogOutClick}>Logout</Button>
                </div>
            </div>
        )
    }
}

export default MainPage;