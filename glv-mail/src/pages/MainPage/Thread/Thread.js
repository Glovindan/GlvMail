import React from "react";
import styles from "./Thread.module.css";
import { Button } from "react-bootstrap";
import {
  extractField,
  parseEmailHeader,
} from "../ThreadList/ListItem/ListItemLogic";
import {parseEmailBody, getMessageData } from "./ThreadLogic";
import {Navigate} from "react-router-dom";

class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isLoaded: false,
      from: "",
      email: "",
      subject: "",
      date: "",
      snippet: "",
    };

    this.handleBackClick = this.handleBackClick.bind(this);
    this.messageData = {id: this.props.messageId}; // Брать из пропсов
  }

  handleBackClick() {
    this.setState({redirect: true});
  }

  async componentDidMount() {
    getMessageData(this.messageData.id).then(async (response) => {
      const result = response.result;
      const headers = result.payload.headers;

      const from = parseEmailHeader(extractField(headers, "From"));
      const date = extractField(headers, "Date");
      const subject = extractField(headers, "Subject");
      const body = await parseEmailBody(result.payload, this.messageData.id);

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
        {this.state.redirect && (<Navigate to={-1} replace={true}/>)}
        <div className={styles.header}>
          <Button variant={"outline-dark"} onClick={this.handleBackClick}>назад</Button>
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
