import React, { useState } from "react";
import { useSelector } from "react-redux";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import { CircularProgress } from "@material-ui/core/";
import Post from "./Post/Post";
import "./styles.css";
import { relativeTimeRounding } from "moment";

const Posts = ({ setCurrentId, showFollowers }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [following, setFollowing] = useState(user?.result?.following);



  if (!following && user?.result) {
    window.location.reload();
  }

  if (!posts.length && !isLoading) return "No posts";

  let displayPosts;
  if (showFollowers) {
    displayPosts = posts.filter((post) => following.includes(post.creator))
  } else {
    displayPosts = posts
  }
  console.log(displayPosts)

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

  const childPosts = displayPosts?.map((post, i) => {
    return <Post post={post} key={i} setCurrentId={setCurrentId} following={following} setFollowing={setFollowing} />;
  });

  return isLoading ? (
    <CircularProgress size='7em' />
  ) : (
    <BubbleUI className={'myBubbleUI'} options={options}>
      {displayPosts?.map((post) => {
        return (
          <Post
            post={post}
            following={following}
            setFollowing={setFollowing}
          />
        );
      })}
    </BubbleUI>
  );
};

export default Posts;
