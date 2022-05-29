import React from "react";
import useStyles from "./styles";
<<<<<<< HEAD
=======
import githubImage from "./githubImage.png";
>>>>>>> e1b94b1de8decbf11434a82bcdc22c9511302ff9
import { Link } from "react-router-dom";
const linkStyle = {
  color: "rgb(255, 255, 255)",
};
<<<<<<< HEAD
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
=======
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
>>>>>>> e1b94b1de8decbf11434a82bcdc22c9511302ff9

export default Footer;
