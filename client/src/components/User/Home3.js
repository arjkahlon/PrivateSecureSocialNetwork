import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import UserNavbar from "../Navbar/UserNavbar";
import { getPosts } from "../../actions/posts";
import UserPosts from "../Posts/UserPost";
import Footer from "../Footer/footer";

const Home3 = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <UserNavbar />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} sm={50}>
            <UserPosts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </Grow>
  );
};

export default Home3;
