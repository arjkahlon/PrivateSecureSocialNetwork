import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../SideBar/SideBar";
import Posts from "../Posts/Posts";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [followingPage, setFollowingPage] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  // const loggedInUser = getUser(user?.email);

  const handleFollowingPage = () => {
    if (followingPage) {
      setFollowingPage(false);
    } else {
      setFollowingPage(true);
    }
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
            <Button onClick={handleFollowingPage} className={classes.popup} color = "secondary">
                {followingPage ? "Following" : "Home"}
            </Button>
          <Grid item xs={12} sm={6} md={9}>
            {/* if (!handleFollowingPage)
            { */}
            <Posts setCurrentId={setCurrentId} showFollowers={followingPage} />
            {/* } */}
          </Grid>
          <Footer />
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
