import React from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
const linkStyle = {
  color: "rgb(255, 255, 255)",
};
const Footer = () => (
  <div className="footer">
    <p>
      This is an open source website. Build your own version of the website by
      cloning from this &nbsp;
      <Link
        to="https://github.com/arjkahlon/PrivateSecureSocialNetwork"
        style={linkStyle}
      >
        URL
      </Link>
    </p>
  </div>
);

export default Footer;
