import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import { storeUser } from "../../actions/users";

import decode from "jwt-decode";
import useStyles from "./styles";
import { GoogleLogin } from "react-google-login";
import { AUTH } from "../../constants/actionTypes";
import * as actionType from "../../constants/actionTypes";
import Icon from "../Auth/icon";
import Navbar2 from "../Navbar/Navbar2";
import Footer from "../Footer/footer";
import pic from "./pic.png";

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
    try {
      dispatch(storeUser(res, history));

      history.push("/Homes");
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
    <>
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
            <img className={classes.image} src={pic} alt="icon" />
            <div className={classes.aboutUs}>
              <p>
                HourGlass is an open sourced private and secure social media
                platform! With its modern, sleek, and user friendly interface it
                is a social media website that can be used by anyone!
              </p>
              <p>
                {" "}
                Once signed in with your Google account you can upload images
                and can like and comment other people's images. Images stay on
                the website for 24 hours. Each like adds 30 minutesto the
                image's life and each comment adds 1 hour.
              </p>
              <p>
                {" "}
                So, sign in and start posting cause the sand is emptying quickly
                from the HourGlass!
              </p>
            </div>
          </Grid>
        </Container>
      </Grow>
      <container>
        <Footer />
      </container>
    </>
  );
};

export default SignIN;
