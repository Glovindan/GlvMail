import React from "react";
import styles from "./Thread.module.css";
import {Button} from "react-bootstrap";
import {html, html1} from "./wtf";
import {decodeEntity, extractField, parseEmailHeader} from "../ThreadList/ListItem/ListItemLogic";
import {parseEmailBody} from "./ThreadLogic";
const GAPI = window.gapi;

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

    this.messageData = {id: '17f2b5852002d392', threadId: '17f2598374fe681b'}; // Брать из пропсов
  }

  componentDidMount() {
    console.log(GAPI);
    GAPI.client.gmail.users.messages
      .get({
        userId: "me",
        id: this.messageData.id
      })
      .then((response) => {
        const result = response.result;
        const headers = result.payload.headers;

        console.log(result);

        const from = extractField(headers, "From");
        const fromParsed = parseEmailHeader(from);
        const date = extractField(headers, "Date");
        const subject = extractField(headers, "Subject");
        const body = parseEmailBody(result.payload)

        this.setState({
          isLoaded: true,
          from: fromParsed.name,
          email: fromParsed.email,
          subject: subject,
          date: new Date(date).toLocaleString(),
          body: body,
        });
      }); //Список сообщений
  }

  render() {

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button variant={"outline-dark"}>назад</Button>
          <div>{this.state.email}</div>
          <div>{this.state.date}</div>
        </div>
        <div className={styles.body}>
          <div dangerouslySetInnerHTML={{ __html: this.state.body}}/>
        </div>
      </div>
    );
  }
}

export default Thread;