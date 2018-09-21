import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, ButtonGroup, Button, EmptyState } from "@auth0/cosmos";
import { FetchImage } from "../../requests";
import { Container } from "../";

export default class Picture extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      access_token: PropTypes.string.isRequired,
      id_token: PropTypes.string.isRequired,
      expires_at: PropTypes.string.isRequired,
      scopes: PropTypes.string.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.handleLoadDog = this.handleLoadDog.bind(this);
    this.handleLoadCat = this.handleLoadCat.bind(this);

    this.handleLoadDog();
  }

  state = {};

  handleLoadDog() {
    FetchImage("dog")
      .then(response =>
        this.setState(state => ({ ...state, picture: response.url }))
      )
      .catch(error => this.setState(state => ({ ...state, error: error })));
  }

  handleLoadCat() {
    const jwt = this.props.auth ? this.props.auth.access_token : undefined;

    FetchImage("cat", jwt)
      .then(response =>
        this.setState(state => ({ ...state, picture: response.url }))
      )
      .catch(error => this.setState(state => ({ ...state, error: error })));
  }

  render() {
    return (
      <Container>
        <ButtonGroup align="left">
          <Button
            size="default"
            appearance="default"
            onClick={this.handleLoadDog}
          >
            Show me a dog
          </Button>
          <Button
            size="default"
            appearance="default"
            onClick={this.handleLoadCat}
          >
            Show me a cat
          </Button>
        </ButtonGroup>

        {this.state.error && (
          <div style={{ margin: "24px 0 0" }}>
            <Alert type="danger" title="Oops!" dismissible>
              {this.state.error.message}
            </Alert>
          </div>
        )}

        {this.state.picture && (
          <img
            src={this.state.picture}
            style={{
              width: "100%",
              maxWidth: "100%",
              marginTop: "24px"
            }}
          />
        )}
      </Container>
    );
  }
}
