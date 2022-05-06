import React from "react";
import { AppBar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import hourglass from "../../images/hourglass-sand-timer-Q9xEnN9-600.jpg";

import useStyles from "./styles";

const Navbar2 = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Button
          component={Link}
          to="/Homes"
          variant="contained"
          className={classes.logout}
        >
          <img
            className={classes.image}
            src={hourglass}
            alt="icon"
            height="100"
          />
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            HourGlass
          </Typography>
        </Button>
      </div>
    </AppBar>
  );
};

export default Navbar2;
