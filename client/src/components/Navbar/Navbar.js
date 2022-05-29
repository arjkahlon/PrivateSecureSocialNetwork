import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import Popup from "reactjs-popup";
//import "reactjs-popup/dist/index.css";

import { GoogleLogin } from "react-google-login";
import { AUTH } from "../../constants/actionTypes";
import Icon from "../Auth/icon";
import hourglass from "../../images/hourglass-sand-timer-Q9xEnN9-600.jpg";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggle = () => {
    setState(!state);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/");

    setUser(null);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    alert("Google Sign In was unsuccessful. Try again later");

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <React.Fragment>
      <AppBar
        className={classes.appBar}
        color="inherit"
        sx={{ width: 1 }}
        style={{ minWidth: "100%" }}
      >
        <div className={classes.brandContainer}>
          <img
            className={classes.image}
            src={hourglass}
            alt="icon"
            height="100"
          />
          <Typography
            component={Link}
            to="/Homes"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            HourGlass
          </Typography>
          <Button onClick={toggle} className={classes.popup}>
            {state ? "Following" : "Home"}
          </Button>
        </div>

        <Toolbar className={classes.toolbar}>
          {user?.result ? (
            <div className={classes.profile}>
              <Button
                variant="text"
                component={Link}
                to="/User"
                className={classes.userProfile}
              >
                <Avatar
                  className={classes.av}
                  alt={user?.result.name}
                  src={user?.result.imageUrl}
                >
                  {user?.result.name.charAt(0)}
                </Avatar>
              </Button>
              <Button
                component={Link}
                to="/Homes"
                variant="text"
                className={classes.logout}
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/Home"
                variant="text"
                className={classes.logout}
              >
                <b>+</b>
              </Button>
            </div>
          ) : (
            <GoogleLogin
              clientId="201954831376-02jtel3qqftcjpa2gdomp17a0eo30crj.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
