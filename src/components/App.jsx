import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import firebase from "firebase/app";

import Home from "./Home";
import Posts from "./Posts";
import HeaderNav from "./common/HeaderNav";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import "../assets/styles/app.scss";
import * as authActions from "../actions/auth";
import * as alerts from "../utils/alerts";

class App extends React.Component {
  UNSAFE_componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.changeAuth(true);
      } else {
        this.props.changeAuth(false);
      }
    });
  }

  handleLogout = () => {
    const { history } = this.props;
    firebase
      .auth()
      .signOut()
      .then(function() {
        history.push("/login");
        alerts.success("Successfully logged out");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthed");
      })
      .catch(function(error) {
        alerts.error(error.message);
      });
  };

  render() {
    const { auth } = this.props;
    return (
      <div>
        <HeaderNav isAuthed={auth.isAuthed} handleLogout={this.handleLogout} />
        <section className="app-wrapper">
          <Route exact path="/" component={Home} />
          <Route path="/posts" component={Posts} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </section>
        <ToastContainer autoClose={false} transition={Zoom} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, authActions)(App);
