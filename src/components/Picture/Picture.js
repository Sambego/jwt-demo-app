import React, { Component } from "react";
import "./Picture.css";

export default class Picture extends Component {
  constructor(props) {
    super(props);

    this.handleGetDog = this.handleGetDog.bind(this);
    this.handleGetCat = this.handleGetCat.bind(this);

    this.handleGetDog();
  }

  state = {};

  makeRequest(endpoint, method = "GET", headers = new Headers()) {
    const request = new Request(`http://localhost:3000/api/${endpoint}`);

    return fetch(request, {
      method,
      headers
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }

        return Promise.reject(response);
      })
      .then(response =>
        this.setState(state => ({
          picture: response.url,
          error: undefined
        }))
      )
      .catch(error =>
        this.setState(state => ({ picture: undefined, error: error }))
      );
  }

  handleGetDog() {
    Picture;
    this.makeRequest("dog");
  }

  handleGetCat() {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.props.token}`);

    this.makeRequest("cat", "GET", headers);
  }

  render() {
    return (
      <div className="picture_container">
        <button onClick={this.handleGetDog} className="button picture_button">
          Get dog picture
        </button>
        <button onClick={this.handleGetCat} className="button picture_button">
          Get cat picture (protected)
        </button>

        {this.state.error && (
          <pre className="error">
            {this.state.error.status}: {this.state.error.statusText}
          </pre>
        )}
        {this.state.picture && (
          <img src={this.state.picture} className="picture_image" />
        )}

        <button onClick={this.props.onLogout} className="button">
          Logout
        </button>
      </div>
    );
  }
}
