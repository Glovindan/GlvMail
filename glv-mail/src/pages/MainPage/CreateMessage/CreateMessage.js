import React from "react";
import styles from "./CreateMessage.module.css";
import {Button} from "react-bootstrap";
const GAPI = window.gapi;

class CreateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from : GAPI.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail(),
      to : "",
      subject: "",
      body: "",
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
  }

  handleFieldChange(e) {
    this.setState({[e.target.id] : e.target.value});
  }

  handleSendClick() {
   const message =
   `From:${this.state.from}\r\n` +
   `To:${this.state.to}\r\n` +
   `Subject:${this.state.subject}\r\n\r\n` +
   `${this.state.body}`;

   const encodedMessage = btoa(message).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    GAPI.client.gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: encodedMessage
      }
    }).then((response) => { console.log(response)});
  }

  render() {
    return (
      <div className={styles.container}>
        <h6>Отправить письмо</h6>
        <input id={"to"} type="text" placeholder={"to"} onChange={this.handleFieldChange}/>
        <input id={"subject"} type="text" placeholder={"subject"} onChange={this.handleFieldChange}/>
        <textarea name="body" id="body" cols="30" rows="10" onChange={this.handleFieldChange}/>
        <Button onClick={this.handleSendClick}>Отправить</Button>
      </div>
    );
  }
}

export default CreateMessage;