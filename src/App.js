import React, { Component } from "react";
import Login from "./components/Login/Login.js";
import Picture from "./components/Picture/Picture.js";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    token: window.localStorage.getItem("token")
  };

  handleLogin(username, password) {
    const headers = new Headers();
    headers.append("content-type", "application/json");

    const request = new Request("http://localhost:3000/api/authenticate", {
      headers,
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    });

    return fetch(request)
      .then(response => {
        if (response && response.status === 200) {
          return response.text();
        }

        return Promise.reject(response);
      })
      .then(response => {
        window.localStorage.setItem("token", response);
        this.setState(state => ({
          ...state,
          token: response,
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
    this.setState(state => ({ ...state, token: undefined }));
    window.localStorage.removeItem("token");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cats & dogs</h1>
        </header>

        {this.state.token ? (
          <Picture token={this.state.token} onLogout={this.handleLogout} />
        ) : (
          <Login onLogin={this.handleLogin} error={this.state.error} />
        )}
      </div>
    );
  }
}
