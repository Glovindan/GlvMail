import React from "react";
import styles from "./MainPage.module.css";
import ThreadList from "./ThreadList/ThreadList";
import Thread from "./Thread/Thread"
import { Button } from "react-bootstrap";
import { isSignedIn, signOut } from "../Auth/AuthLogic";
import Loading from "../../components/Loading/Loading";
import {loadClient, loadMessages} from "./MainPageLogic";

const GAPI = window.gapi;

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.onLogInStatusChange = props.onLogInStatusChange;

    this.state = {
      isLoaded: false,
      isFetching: false,
      messageList: [],
      nextPageToken: "0",
    };
  }

  handleLogOutClick() {
    signOut().then(() => {
      this.onLogInStatusChange(isSignedIn());
    });
  }

  handleScroll(e) {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      !this.state.isFetching
    ) {
      this.setState({ isFetching: true });
      loadMessages(this.state.nextPageToken)
        .then((response) =>
          this.setState({
            isFetching: false,
            messageList: [
              ...this.state.messageList,
              ...response.result.messages,
            ],
            nextPageToken: response.result.nextPageToken,
          })
        )
        .finally(() => this.setState({ isFetching: false }));
    }
  }

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
    loadClient().then(() => {
      this.setState({
        isLoaded: true,
      });
      loadMessages(this.state.nextPageToken).then((response) => {
        this.setState({
          messageList: [...this.state.messageList, ...response.result.messages],
          nextPageToken: response.result.nextPageToken,
        });
      });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className="d-grid gap-2">
            <Button className={styles.btn} variant="primary">
              Inbox
            </Button>
            <Button className={styles.btn} variant="primary">
              Drafts
            </Button>
          </div>
        </div>

        <div className={styles.main}>
          {this.state.isLoaded ? (
            <Thread
              messageData={{
                id: "17f289e7233775fa",
                threadId: "17f2598374fe681b",
              }}
            />
          ) : null}
          <ThreadList messageList={this.state.messageList} />
          <div className={styles.loadingWrapper}>
            <Loading />
          </div>
        </div>

        <div className={styles.rightThing}>
          <div className="d-grid gap-3">
            <Button
              className={styles.btn}
              variant="danger"
              onClick={this.handleLogOutClick}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;