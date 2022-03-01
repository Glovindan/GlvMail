import React from "react";
import styles from "./Thread.module.css";
import { Button } from "react-bootstrap";
import {
  extractField,
  parseEmailHeader,
} from "../ThreadList/ListItem/ListItemLogic";
import {parseEmailBody, getMessageData } from "./ThreadLogic";

class Thread extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      from: "",
      email: "",
      subject: "",
      date: "",
      snippet: "",
    };

    this.messageData = this.props.messageData; // Брать из пропсов
  }

  componentDidMount() {
    getMessageData(this.messageData.id).then((response) => {
      const result = response.result;
      const headers = result.payload.headers;

      console.log(result);

      const from = parseEmailHeader(extractField(headers, "From"));
      const date = extractField(headers, "Date");
      const subject = extractField(headers, "Subject");
      const body = parseEmailBody(result.payload, this.messageData.id);

      this.setState({
        isLoaded: true,
        from: from.name,
        email: from.email,
        subject: subject,
        date: new Date(date).toLocaleString(),
        body: body,
      });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button variant={"outline-dark"}>назад</Button>
          <div>{this.state.email}</div>
          <div>{this.state.date}</div>
        </div>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: this.state.body }}
        />
      </div>
    );
  }
}

export default Thread;
