import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { storeUser } from "../../actions/users";

//import "reactjs-popup/dist/index.css";

import { GoogleLogin } from "react-google-login";
import { AUTH } from "../../constants/actionTypes";
import Icon from "../Auth/icon";
import hourglass from "../../images/hourglass-sand-timer-Q9xEnN9-600.jpg";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar2 = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/");

    setUser(null);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(storeUser(res, history));

      history.push("/Homes");
    } catch (error) {
      console.log(error);
    }
  };

  const reload = () => {
    window.location.reload();
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
            onClick= {reload}
            className={classes.heading}
            variant="h2"
            align="center"
          >
            ourGlass
          </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
          <div>
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
                  style={{ width: 200 }}
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </div>
          <div>
            <Button
              className={classes.viewPost}
              color="primary"
              variant="contained"
              component={Link}
              to="/Homes"
              style={{ marginLeft: "5%", width: 200 }}
            >
              View Posts
            </Button>
          </div>
        </Toolbar>
        {/* <GoogleLogin
          clientId="201954831376-02jtel3qqftcjpa2gdomp17a0eo30crj.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              className={classes.googleButton}
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<Icon />}
              variant="contained"
            >
              Sign In With Google
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />

        <Button
          component={Link}
          to="/Homes"
          variant="contained"
          className={classes.logout}
        >
          View Posts
        </Button> */}
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar2;
