import React from "react";
import { useSelector } from "react-redux";
import BubbleUI from "react-bubble-ui";
import { Container } from "@material-ui/core";
import "react-bubble-ui/dist/index.css";
import Footer from "../Footer/footer";
import UserNavbar from "../Navbar/UserNavbar";

import Navbar from "../Navbar/Navbar";
import UPost from "./Post/UPost";
import Post from './Post/Post';
import "./styles.css";

const UserPosts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));

  if (!posts.length && !isLoading) {
    return (
      // "No posts";
      <div>
        <b4>You Haven't Made Any Posts</b4>
      </div>
    ); 
  }

  const options = {
    size: 375,
    minSize: 175,
    gutter: 30,
    provideProps: true,
    numCols: 6,
    fringeWidth: 100,
    yRadius: 150,
    xRadius: 150,
    cornerRadius: 200,
    showGuides: false,
    compact: true,
    gravitation: 0,
  };

  const childPosts = posts?.filter((post) => post.creator == user?.result?.googleId)?.map((post, i) => {
    return <Post post={post} key={i} setCurrentId={setCurrentId} />;
  });

  return isLoading ? (
    <>
      <UserNavbar />
      <Footer />
    </>
  ) : (
    <Container maxWidth="xl">
      <BubbleUI className={"myBubbleUI"} options={options}>
        {childPosts}
      </BubbleUI>
    </Container>
  );
};

export default UserPosts;
