import React from "react";
import styles from "./ThreadList.module.css"
import ListItem from "./ListItem/ListItem"
const GAPI = window.gapi;

class ThreadList extends React.Component {
    constructor(props) {
        super(props);
        this.messageList = props.messageList;
        // console.log(this.messageList);
    }

    componentDidMount() {
        // console.log("yep")
        this.listItems = this.messageList.map(messageData => <ListItem key={messageData.id} messageData={messageData}/>)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.listItems = this.messageList.map(messageData => <ListItem key={messageData.id} messageData={messageData}/>)
    }

    render() {


        return (
            <ul>
                {this.listItems}
            </ul>
        )
    }
}

export default ThreadList;