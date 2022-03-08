import React from "react";
import styles from "./ListItem.module.css";
import {extractField, decodeEntity, parseEmailHeader} from "./ListItemLogic";
import { Navigate } from "react-router-dom"

const GAPI = window.gapi;

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      from: "",
      subject: "",
      date: "",
      snippet: "",
    };

    this.handleMailClick = this.handleMailClick.bind(this);
    this.messageData = this.props.messageData;
  }

  handleMailClick() {
    this.setState({redirect: true});
  }

  componentDidMount() {
    // const userId = GAPI.auth2.getAuthInstance().currentUser.get().getId();

    GAPI.client.gmail.users.messages
      .get({
        userId: "me",
        id: this.messageData.id,
        format: 'metadata',
        metadataHeaders:["From","Date","Subject"]
      })
      .then((response) => {
        const result = response.result;
        const headers = result.payload.headers;

        // console.log(result);
        // console.log(headers);

        const from = extractField(headers, "From");
        const fromParsed = parseEmailHeader(from);
        const date = extractField(headers, "Date");
        const subject = extractField(headers, "Subject");

        this.setState({
          isLoaded: true,
          redirect: false,
          from: fromParsed.name,
          subject: subject,
          date: new Date(date).toLocaleString(),
          snippet: decodeEntity(result.snippet),
        });
      }); //Список сообщений
  }

  render() {
    const placeholder = (
      <div>
        <div className={styles.subjectPlaceholder} />
        <div className={styles.snippetPlaceholder} />
        <div className={styles.bottomLinePlaceholder} />
        <div className={styles.bottomPlaceholder} />
      </div>
    );

    const loaded = (
      <div>
        <div className={styles.subject}>{this.state.subject}</div>
        <div className={styles.snippet}>{this.state.snippet}</div>
        <div className={styles.bottom}>
          <div className={styles.from}>{this.state.from}</div>
          <div className={styles.date}>{this.state.date}</div>
        </div>
      </div>
    );

    return (
      <li className={styles.container} onClick={this.handleMailClick}>
        {this.state.redirect && (<Navigate to={`/messages/${this.props.messageData.id}`} replace={true}/>)}
        {this.state.isLoaded ? loaded : placeholder}
      </li>
    );
  }
}

export default ListItem;