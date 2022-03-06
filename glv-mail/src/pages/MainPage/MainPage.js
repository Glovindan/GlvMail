import React from "react";
import styles from "./MainPage.module.css";
import ThreadList from "./ThreadList/ThreadList";
import Thread from "./Thread/Thread"
import { Button } from "react-bootstrap";
import { isSignedIn, signOut } from "../Auth/AuthLogic";
import {html} from "./Thread/wtf";

const GAPI = window.gapi;

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.onLogInStatusChange = props.onLogInStatusChange;

    this.state = {
      isLoaded : false,
      messageList: []
    };
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
        this.setState({
          isLoaded : true
        });
        GAPI.client.gmail.users.messages
          .list({
            userId: "me",
            maxResults: 150,
            pageToken: "0"
          })
          .then((response) => {
            this.setState({
              messageList: response.result.messages
            });
            console.log(response.result.nextPageToken);//Показывает токен следующей страницы
          }); //Список сообщений
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className="d-grid gap-2">
            <Button className={styles.btn} variant="primary">Inbox</Button>
            <Button className={styles.btn} variant="primary">Drafts</Button>
          </div>
        </div>

        <div className={styles.main}>
          {this.state.isLoaded ? <Thread messageData={{id: '17f289e7233775fa', threadId: '17f2598374fe681b'}}/> : null}
          <ThreadList messageList={this.state.messageList} />
          <div className={styles.anchor}></div>
        </div>

        <div className={styles.rightThing}>
          <div className="d-grid gap-3">
            <Button className={styles.btn} variant="danger" onClick={this.handleLogOutClick}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;