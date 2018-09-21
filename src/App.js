import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Logo } from "@auth0/cosmos";
import { Authentication } from "./requests";
import { Nav, Login, Picture, Callback } from "./components";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  state = {};
  authentication = new Authentication();

  handleLogin(username, password) {
    this.authentication.login(username, password).catch(error => {
      this.setState(state => ({
        ...state,
        auth: undefined,
        error: error
      }));
    });
  }

  handleLogout() {
    this.setState(state => ({ ...state, error: undefined, jwt: undefined }));
    this.authentication.logout();
  }

  handleAuthentication(nextState) {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.authentication
        .handleAuthentication()
        .then(auth => {
          this.setState(state => ({
            ...state,
            auth,
            error: undefined
          }));
        })
        .catch(error => {
          this.setState(state => ({
            ...state,
            auth: undefined,
            error: error
          }));
        });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav
            title="Cats and dogs"
            isLoggedIn={this.authentication.isAuthenticated(this.state.auth)}
            onLogout={this.handleLogout}
          />

          <Route
            exact
            path="/"
            render={props => <Picture auth={this.state.auth} {...props} />}
          />
          <Route
            path="/login"
            render={props => (
              <Login
                onLogin={this.handleLogin}
                error={this.state.error}
                {...props}
              />
            )}
          />
          <Route
            path="/callback"
            render={props => {
              if (!this.state.auth) {
                this.handleAuthentication(props);
              }

              return <Callback {...props} auth={this.state.auth} />;
            }}
          />
        </div>
      </Router>
    );
  }
}
