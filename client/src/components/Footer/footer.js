import React from "react";
import useStyles from "./styles";
import githubImage from "./githubImage.png";
import { Link } from "react-router-dom";
const linkStyle = {
  color: "rgb(255, 255, 255)",
};
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <p>
        This is an open source website. Build your own version of the website by
        cloning from GitHub: &nbsp;
        <Link
          to="https://github.com/arjkahlon/PrivateSecureSocialNetwork"
          style={linkStyle}
        >
          <img className={classes.image} src={githubImage} alt="icon" />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
