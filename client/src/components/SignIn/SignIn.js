import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import decode from "jwt-decode";
import useStyles from "./styles";
import { GoogleLogin } from "react-google-login";
import { AUTH } from "../../constants/actionTypes";
import * as actionType from "../../constants/actionTypes";
import Icon from "../Auth/icon";
import Navbar2 from "../Navbar/Navbar2";
import hourglass from "../../images/hourglass-sand-timer-Q9xEnN9-600.jpg";
const SignIN = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
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
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/");

    setUser(null);
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
    <Grow in>
      <Container maxWidth="xl">
        <Navbar2 />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="stretch"
          spacing={4}
          className={classes.gridContainer}
        >
          <img
            className={classes.image}
            src={hourglass}
            alt="icon"
            height="100"
          />
          <Grid item xs={12} sm={6} md={9}>
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
                  Please Sign In With Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </Grid>
          <Button
            component={Link}
            to="/Homes"
            variant="contained"
            color="primary"
            className={classes.logout}
          >
            View Posts
          </Button>
        </Grid>
      </Container>
    </Grow>
  );
};

export default SignIN;
