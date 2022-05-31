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
    <div>
      <UserNavbar />
      <div
        container
        direction="row"
        justify="space-around"
        alignItems="stretch"
        spacing={4}
      >
        <h1 style={{ marginTop: "7%", color: "rgb(0,0,0)" }}>
          <center>User Profile</center>
        </h1>
          <UserPosts setCurrentId={setCurrentId} />
      </div>
      <Footer />
    </div>
  );
};

export default Home3;
