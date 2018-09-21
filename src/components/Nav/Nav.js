import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button, Logo } from "@auth0/cosmos";

const Nav = ({ title, isLoggedIn, onLogout, history, username, picture }) => {
  const styles = {
    nav: {
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      background: "#222"
    },
    container: {
      display: "flex",
      alignItems: "center"
    },
    title: {
      display: "inline-block",
      marginLeft: "12px",
      fontSize: "14px",
      color: "#F1F1F1",
      fontWeight: 700,
      letterSpacing: "1.4px"
    },
    avatar: {
      overflow: "hidden",
      display: "inline-block",
      margin: "0 12px",
      width: "28px",
      height: "28px",
      borderRadius: "50%"
    }
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Logo />
        <h1 style={styles.title}>{title}</h1>
      </div>
      {!isLoggedIn && (
        <Button size="default" appearance="cta" onClick={handleLogin}>
          Log in
        </Button>
      )}
      {isLoggedIn && (
        <div style={styles.container}>
          {username && (
            <span
              style={{
                ...styles.container,
                paddingRight: "28px",
                color: "#fff"
              }}
            >
              {picture && (
                <span style={styles.avatar}>
                  <img src={picture} style={{ width: "100%" }} />
                </span>
              )}
              <strong>{username}</strong>
            </span>
          )}
          <Button size="default" appearance="cta" onClick={onLogout}>
            Log out
          </Button>
        </div>
      )}
    </nav>
  );
};

Nav.propTypes = {
  title: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func.isRequired
};

Nav.defaultProps = {
  isLoggedIn: false
};

export default withRouter(Nav);
