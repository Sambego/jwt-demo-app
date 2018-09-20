import React, { Component } from "react";
import { Logo } from "@auth0/cosmos";
import { Authenticate } from "./requests";
import { Nav, Login, Picture } from "./components";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {};

  handleLogin(username, password) {
    Authenticate(username, password)
      .then(response => {
        console.log("JWT:", response.jwt);

        return this.setState(state => ({
          ...state,
          jwt: response.jwt,
          error: undefined
        }));
      })
      .catch(error =>
        this.setState(state => ({
          ...state,
          token: undefined,
          error: error
        }))
      );
  }

  handleLogout() {
    this.setState(state => ({ ...state, error: undefined, jwt: undefined }));
  }

  render() {
    return (
      <div className="App">
        <Nav
          title="Cats and dogs"
          isLoggedIn={!!this.state.jwt}
          onLogout={this.handleLogout}
        />

        {this.state.jwt ? (
          <Picture jwt={this.state.jwt} />
        ) : (
          <Login onLogin={this.handleLogin} error={this.state.error} />
        )}
      </div>
    );
  }
}
