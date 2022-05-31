import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider, Grow, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import BubbleUI from "react-bubble-ui";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/Navbar";
import "react-bubble-ui/dist/index.css";
import useStyles from "./styles";

import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  const makeAReturnString = () => {
    if (location.pathname.startsWith('/tags')) {
      var tagMessage = "#" + name + " posts"
      return tagMessage;
    }
    else {
      var creatorMessage = "Posts by " + name;
      return creatorMessage;
    }
  }


  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  const changeTags = () => {
    if (location.pathname.startsWith('/tags')) {
      console.log("Got triggered!");
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }


  useEffect(() => {
    changeTags();
  }, []);

  if (!posts.length && !isLoading) return 'No posts';

  const options = {
    size: 375,
    minSize: 175,
    gutter: 30,
    provideProps: true,
    numCols: 4,
    fringeWidth: 100,
    yRadius: 150,
    xRadius: 150,
    cornerRadius: 200,
    showGuides: false,
    compact: true,
    gravitation: 0,
  };

  const childPosts = posts?.map((post, i) => {
    return <Post post={post} key={i} />;
  });

  return (
      <Grow in>
      <Container maxWidth="xl">
        <Navbar />
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
            <h1>Remove in OtherUsersAndTags</h1>
            <h1>Remove in OtherUsersAndTags</h1>
            <h1>
              <center>
              {makeAReturnString()}
              </center>
            </h1>
           
            
            {isLoading ? <CircularProgress /> : (
              <BubbleUI className={"myBubbleUI"} options={options}>
              {childPosts}
            </BubbleUI>
            )}
            {/* } */}
          </Grid>
          <Footer />
        </Grid>
      </Container>
    </Grow>
  );
};

export default CreatorOrTag;