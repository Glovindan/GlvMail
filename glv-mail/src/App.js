import "./App.module.css";
import Auth from "./pages/Auth/Auth";
import React from "react";
import MainPage from "./pages/MainPage/MainPage";
import { isSignedIn, loadAPI } from "./pages/Auth/AuthLogic";
import Loading from "./components/Loading/Loading";
import styles from "./App.module.css"
class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogInStatus = this.handleLogInStatus.bind(this);

    this.state = {
      isLoaded: false,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    loadAPI().then(
      (res) => {
        console.log(res);

        this.handleLogInStatus(isSignedIn());

        this.setState({
          isLoaded: true
        });
      },
      (err) => console.log(err)
    );
  }

  handleLogInStatus(isLoggedIn) {
    this.setState({
      isLoggedIn: isLoggedIn,
    });
  }

  render() {
    return (
      <div className="App">
        {/*{this.state.isLoaded ? (*/}
        {/*  this.state.isLoggedIn ? (*/}
        {/*    <MainPage onLogInStatusChange={this.handleLogInStatus} />*/}
        {/*  ) : (*/}
        {/*    <Auth onLogInStatusChange={this.handleLogInStatus} />*/}
        {/*  )*/}
        {/*) : (*/}
        {/*  <div className={styles.loadingWrapper}>*/}
        {/*    <Loading/>*/}
        {/*  </div>*/}
        {/*)}*/}

        <Loading/>
      </div>
    );
  }
}

export default App;
