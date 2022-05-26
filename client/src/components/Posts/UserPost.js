import React from "react";
import { useSelector } from "react-redux";
import BubbleUI from "react-bubble-ui";
import { Container } from "@material-ui/core";
import "react-bubble-ui/dist/index.css";
import Footer from "../Footer/footer";
import UserNavbar from "../Navbar/UserNavbar";

import UPost from "./Post/UPost";
import "./styles.css";

const UserPosts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No posts";

  const options = {
    size: 400,
    minSize: 120,
    gutter: 65,
    provideProps: true,
    numCols: 3,
    fringeWidth: 200,
    yRadius: 140,
    xRadius: 140,
    cornerRadius: 200,
    showGuides: false,
    compact: true,
    gravitation: 5,
  };

  const childPosts = posts?.map((post, i) => {
    return <UPost post={post} key={i} setCurrentId={setCurrentId} />;
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
