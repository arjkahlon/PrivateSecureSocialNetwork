import React, { useState } from "react";
import { useSelector } from "react-redux";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import { CircularProgress } from '@material-ui/core/';
import Post from "./Post/Post";
import "./styles.css";

const Posts = ({ showFollowers, setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [followers, setFollowers] = useState(user?.result?.followers);

  if (!posts.length && !isLoading) return "No posts";

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

  const displayedPosts = posts;

  if (showFollowers) {
    console.log("changestate");
    displayedPosts = posts.filter((post) => followers.includes(post.creator));
  } 

  const childPosts = displayedPosts?.map((post, i) => {
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
