import "./App.module.css";
import Auth from "./pages/Auth/Auth";
import React from "react";
import MainPage from "./pages/MainPage/MainPage";
import { isSignedIn, loadAPI } from "./pages/Auth/AuthLogic";
import Loading from "./components/Loading/Loading";
import styles from "./App.module.css"
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
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
      <div>
        {this.state.isLoaded ? (
          <Routes>
            <Route path={"/"} element={<Navigate to={"/messages"}/>}/>
            <Route
              path={"messages/*"}
              element={
              this.state.isLoggedIn ? (<MainPage onLogInStatusChange={this.handleLogInStatus} />) :
                (<Navigate to={'/auth'}/>)
              }
            />
            <Route
              path={"auth"}
              element={<Auth onLogInStatusChange={this.handleLogInStatus} />}
            />
          </Routes>
        ) : (
          <div className={styles.loadingWrapper}>
            <Loading />
          </div>
        )}
      </div>
    );
  }
}

export default App;
