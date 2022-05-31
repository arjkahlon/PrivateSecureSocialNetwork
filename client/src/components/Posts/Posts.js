import React from "react";
import { useSelector } from "react-redux";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import { CircularProgress } from "@material-ui/core/";
import Post from "./Post/Post";
import "./styles.css";

const Posts = ({ setCurrentId, showFollowers }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No posts";

  let displayPosts;
  if (showFollowers) {
    const following = JSON.parse(localStorage.getItem("profile"))?.result?.following;
    displayPosts = posts.filter((post) => following.includes(post.creator))
  } else {
    displayPosts = posts
  }

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

  const childPosts = displayPosts?.map((post, i) => {
    return <Post post={post} key={i} setCurrentId={setCurrentId} />;
  });

  return isLoading ? (
    <CircularProgress size="7em" />
  ) : (
    <BubbleUI className={"myBubbleUI"} options={options}>
      {childPosts}
    </BubbleUI>
  );
};

export default Posts;
