import React, { Component } from "react";
import Login from "./components/Login/Login.js";
import Picture from "./components/Picture/Picture.js";

import "./App.css";

export default class App extends Component {
  state = {
    authenticated: true
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cats & dogs</h1>
        </header>

        {this.state.authenticated ? <Picture /> : <Login />}
      </div>
    );
  }
}
