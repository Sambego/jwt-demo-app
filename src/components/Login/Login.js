import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, Form, FormGroup } from "@auth0/cosmos";
import { Container } from "../";

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: "",
    password: ""
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin(this.state.username, this.state.password);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <Container>
        {this.props.error && (
          <div style={{ marginBottom: "24px" }}>
            <Alert type="danger" title="Oops!" dismissible>
              {this.props.error.message}
            </Alert>
          </div>
        )}
        <FormGroup>
          <Form>
            <Form.FieldSet label="Login">
              <Form.TextInput
                id="username"
                label="Username"
                type="text"
                placeholder="Your username"
                onChange={this.handleChange}
              />
              <Form.TextInput
                id="password"
                label="Password"
                type="password"
                placeholder="Your password"
                onChange={this.handleChange}
              />
              <Form.Actions
                primaryAction={{
                  label: "Log in",
                  handler: this.handleSubmit
                }}
              />
            </Form.FieldSet>
          </Form>
        </FormGroup>
      </Container>
    );
  }
}
