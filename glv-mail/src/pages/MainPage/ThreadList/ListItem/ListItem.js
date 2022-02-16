import React from "react";
import styles from "./ListItem.module.css";

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

    this.messageData = this.props.messageData;
  }

  extractField(headersArr, fieldName) {
    return headersArr.find((header) => header.name === fieldName).value;
  }

  decodeEntity(inputStr) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
  }
  componentDidMount() {
    const userId = GAPI.auth2.getAuthInstance().currentUser.get().getId();

    GAPI.client.gmail.users.messages
      .get({ userId: userId, id: this.messageData.id })
      .then((response) => {
        const result = response.result;
        const headers = result.payload.headers;

        const from = this.extractField(headers, "From");
        const date = this.extractField(headers, "Date");
        const subject = this.extractField(headers, "Subject");

        const fromSplit = from.split(" <");

        fromSplit[0] = fromSplit[0].replace(/"/g, "");
        fromSplit[1] = fromSplit[1].replace(/>/g, "");

        this.setState({
          isLoaded: true,
          from: fromSplit[0],
          subject: subject,
          date: new Date(date).toLocaleString(),
          snippet: this.decodeEntity(result.snippet),
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
      <li className={styles.container}>
        {this.state.isLoaded ? loaded : placeholder}
      </li>
    );
  }
}

export default ListItem;