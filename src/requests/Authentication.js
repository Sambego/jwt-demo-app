import auth0 from "auth0-js";

const HOSTNAME = "http://localhost:3001/";
const AUTH0_CONFIG = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  responseType: "token id_token",
  scope: "openid profile"
};

export default class Authentication {
  auth0 = new auth0.WebAuth({ ...AUTH0_CONFIG });

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.auth0.login(
        {
          realm: "cats-and-dogs",
          username,
          password
        },
        error => {
          if (error) {
            reject(error);
          }

          resolve();
        }
      );
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((error, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          console.log(
            "Successfuly authenticated:",
            this.parseSession(authResult)
          );
          resolve(this.parseSession(authResult));
        } else if (error) {
          console.error("There was a proble authenticating:", error);
          reject(error);
        }
      });
    });
  }

  checkSession() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({ ...AUTH0_CONFIG }, (error, authResult) => {
        if (authResult) {
          resolve(this.parseSession(authResult));
        } else {
          reject(error);
        }
      });
    });
  }

  parseSession(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    const expiresIn = authResult.expiresIn / 60 / 24;
    const scopes = authResult.scope || this.requestedScopes || "";

    return {
      access_token: authResult.accessToken,
      id_token: authResult.idToken,
      expires_at: expiresAt,
      username: authResult.idTokenPayload.nickname,
      scopes
    };
  }

  logout() {
    this.auth0.logout({
      clientID: AUTH0_CONFIG.clientID,
      returnTo: HOSTNAME
    });
  }

  isAuthenticated(authSession) {
    if (!authSession) {
      return false;
    }

    const expiresAt = authSession.expires_at;
    return new Date().getTime() < expiresAt;
  }
}
