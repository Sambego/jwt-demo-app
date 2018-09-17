import React, { Component } from "react";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: "",
    password: ""
  };

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        {this.state.error && (
          <pre className="error">
            {this.state.error.status}: {this.state.error.statusText}
          </pre>
        )}
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={this.state.username}
          onChange={this.handleChange}
          className="input"
        />
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
          className="input"
        />
        <input type="submit" value="Log in" className="button" />
      </form>
    );
  }
}
