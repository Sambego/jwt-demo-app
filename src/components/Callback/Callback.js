import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spinner } from "@auth0/cosmos";

export default class Callback extends Component {
  componentWillUpdate(nextProps) {
    if ((nextProps.auth && nextProps.auth.id_token) || nextProps.error) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center", padding: "48px" }}>
        <Spinner />
      </div>
    );
  }
}
