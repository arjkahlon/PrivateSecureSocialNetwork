import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../SideBar/Sidebar";
import Posts from "../Posts/Posts";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const followingPage = false;

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  // const loggedInUser = getUser(user?.email);

  const handleFollowingPage = () => {
    if (followingPage) {
      followingPage = false;
    } else {
      followingPage = true;
    }
    return followingPage;
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Navbar />
        <Sidebar />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="stretch"
          spacing={4}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            {/* if (!handleFollowingPage)
            { */}
            <Posts setCurrentId={setCurrentId} />
            {/* } */}
          </Grid>
          <Footer />
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
