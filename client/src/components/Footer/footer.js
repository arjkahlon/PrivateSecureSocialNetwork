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
      <center>
        <p>
          This is an open source website. Build your own version of the website
          by cloning from GitHub: &nbsp;
          <a href="https://github.com/arjkahlon/PrivateSecureSocialNetwork">
            <img className={classes.image} src={githubImage} alt="icon" />
          </a>
        </p>
      </center>
    </div>
  );
};

export default Footer;
