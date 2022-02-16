import React from "react";
import styles from "./MainPage.module.css";
import ThreadList from "./ThreadList/ThreadList";
import { Button } from "react-bootstrap";
import { isSignedIn, signOut } from "../Auth/AuthLogic";

const GAPI = window.gapi;

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.onLogInStatusChange = props.onLogInStatusChange;

    this.state = { messageList: [] };
  }

  handleLogOutClick() {
    signOut().then(() => {
      this.onLogInStatusChange(isSignedIn());
    });
  }

  componentDidMount() {
    GAPI.client
      .load("https://gmail.googleapis.com/$discovery/rest?version=v1")
      .then(() => {
        const userId = GAPI.auth2.getAuthInstance().currentUser.get().getId(); //Достать id юзера

        GAPI.client.gmail.users.messages
          .list({
            userId: userId,
            maxResults: 10,
          })
          .then((someVar) => {
            this.setState({ messageList: someVar.result.messages });
          }); //Список сообщений
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className="d-grid gap-3">
            <Button variant="primary">Inbox</Button>
            <Button variant="primary">Drafts</Button>
          </div>
        </div>
        <div className={styles.main}>
          <ThreadList messageList={this.state.messageList} />
        </div>
        <div className={styles.rightThing}>
          <div className="d-grid gap-3">
            <Button variant="danger" onClick={this.handleLogOutClick}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;