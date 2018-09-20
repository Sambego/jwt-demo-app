import React from "react";
import PropTypes from "prop-types";

const Container = ({ children }) => {
  const styles = {
    container: {
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "48px 24px"
    }
  };

  return <div style={styles.container}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
