import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import loadingIcon from './img/glvLoading.svg'
import styles from "./Loading.module.css"

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <img className={styles.loadingIcon} src={loadingIcon} alt="Loading"/>
      </div>
    );
  }
}

export default Loading;