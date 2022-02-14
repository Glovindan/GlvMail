import React from "react";
import styles from "./ListItem.module.css"
const GAPI = window.gapi;

class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            from: "",
            snippet: ""
        }
        this.messageData = this.props.messageData;
    }

    componentDidMount() {
        const userId = GAPI.auth2.getAuthInstance().currentUser.get().getId();

        GAPI.client.gmail.users.messages.get({userId: userId, id: this.messageData.id}).then(someVar => {
            const from = someVar.result.payload.headers.find(header => header.name === "From");
            this.setState({
                from: from.value,
                snippet: someVar.result.snippet
            })
            console.log(someVar.result);
        })//Список сообщений
    }

    render() {

        return (
            <li className={styles.container}>
                <div className={styles.paintItBlack}>
                    {this.state.from}
                </div>
                <div>{this.state.snippet}</div>
            </li>
        )
    }
}

export default ListItem;