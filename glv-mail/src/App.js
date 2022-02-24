import "./App.css";
import Auth from "./pages/Auth/Auth";
import React from "react";
import MainPage from "./pages/MainPage/MainPage";
import { isSignedIn, loadAPI } from "./pages/Auth/AuthLogic";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogInStatus = this.handleLogInStatus.bind(this);

    this.state = { isLoggedIn: false };
  }

  componentDidMount() {
    loadAPI().then(
      (res) => {
        console.log(res);
        this.handleLogInStatus(isSignedIn());
      },
      (err) => console.log(err)
    );
  }

  handleLogInStatus(isLoggedIn) {
    this.setState({ isLoggedIn: isLoggedIn });
    console.log(this.state.isLoggedIn);
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? (
          <MainPage onLogInStatusChange={this.handleLogInStatus} />
        ) : (
          <Auth onLogInStatusChange={this.handleLogInStatus} />
        )}
      </div>
    );
  }
}

export default App;
