import React from "react";
import styles from "./ThreadList.module.css";
import ListItem from "./ListItem/ListItem";

const GAPI = window.gapi;

class ThreadList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { messageList: [] };
  }

  componentDidMount() {
    this.setState({ messageList: this.props.messageList });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.messageList !== prevProps.messageList) {
      this.setState({ messageList: this.props.messageList });
    }
  }

  render() {
    return (
      <ul className={styles.container}>
        {this.state.messageList.map((messageData) => (
          <ListItem key={messageData.id} messageData={messageData}/>
        ))}
      </ul>
    );
  }
}

export default ThreadList;