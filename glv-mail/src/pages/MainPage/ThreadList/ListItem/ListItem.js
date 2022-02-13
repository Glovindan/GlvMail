import React from "react";
import styles from "./ListItem.module.css"

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.messageData = this.props.messageData;
    }

    componentDidMount() {
        console.log("yep 1")
    }

    render() {

        return (
            <li className={styles.container}>
                <div>{this.messageData.id}</div>
                <div>{this.messageData.threadId}</div>
            </li>
        )
    }
}

export default ListItem;