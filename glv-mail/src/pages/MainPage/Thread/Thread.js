import React from "react";
import styles from "./Thread.module.css";
import {Button} from "react-bootstrap";
import {html} from "./wtf";
const GAPI = window.gapi;

class Thread extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button variant={"outline-dark"}>назад</Button>
          <div>email@host.com</div>
          <div>16 фев 18:00</div>
        </div>
        <div className={styles.body}>
          <div dangerouslySetInnerHTML={{ __html: html }}/>
        </div>
      </div>
    );
  }
}

export default Thread;