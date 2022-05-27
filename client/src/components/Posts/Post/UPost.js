import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Divider,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import Popup from "reactjs-popup"
import CommentSection from "../../PostDetails/CommentSection";
import { useHistory, Link } from "react-router-dom";

import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const UPost = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    // styling the image
    image: {
      width: 300,
      height: 300,
      borderRadius: 1000,
    },
  });

  const borderStyle = (value) => {
    if (value > 24) {
      return {
        width: 300,
        height: 300,
        borderRadius: 1000,
        borderWidth: 10,
        borderColor: "#00FF00",
      };
    } else if (value < 1) {
      return {
        width: 300,
        height: 300,
        borderRadius: 1000,
        borderWidth: 10,
        borderColor: "#FF0000",
      };
    } else {
      return {
        width: 300,
        height: 300,
        borderRadius: 1000,
        borderWidth: 10,
        borderColor: "#FFFF00",
      };
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    console.log("Clicked!");
    history.push(`/posts/${post._id}`);
  };

  return (
    <div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div>
          <Popup
                trigger={
                  <Button className="post">
                    <Image
                      style={borderStyle(
                        (86400000 + moment(post.createdAt) - new Date().getTime()) /
                          3600000
                      )}
                      source={
                        post.selectedFile ||
                        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                      }
                    />
                  </Button>
                }
                position="right center"
                Modal
                className={classes.popup}
              >
                <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
                  <div className={classes.card}>
                    <div className={classes.section}>
                      <Typography variant="h3" color="primary" component="h2">
                        {post.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        color="primary"
                        component="p"
                      >
                        {post.message}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        Created by:
                        <Link
                          to={`/creators/${post.name}`}
                          style={{ textDecoration: "none", color: "#3f51b5" }}
                        >
                          {` ${post.name}`}
                        </Link>
                      </Typography>
                      <Typography color="primary" variant="body2">
                        {Math.floor(
                          (86400000 + moment(post.createdAt) - new Date().getTime()) /
                            3600000
                        )}
                        :
                        {Math.floor(
                          (86400000 + moment(post.createdAt) - new Date().getTime()) /
                            60000
                        ) % 60}
                        :
                        {Math.floor(
                          (86400000 + moment(post.createdAt) - new Date().getTime()) /
                            1000
                        ) % 60}
                      </Typography>
                      <Divider style={{ margin: "20px 0" }} />
                      <CommentSection post={post} />
                      <Divider style={{ margin: "20px 0" }} />
                    </div>
                    <Button
                      size="small"
                      color="primary"
                      disabled={!user?.result}
                      onClick={handleLike}
                    >
                      <Likes />
                    </Button>
                    <div className={classes.imageSection}>
                      <img
                        className={classes.media}
                        src={
                          post.selectedFile ||
                          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                        }
                        alt={post.title}
                      />
                    </div>
                  </div>
                </Paper>
              </Popup>
        </div>
      )}
    </div>
  );

  // return (
  //   <div style={{}} className={"postBubble"} onClick={openPost}>
  //     {true ? (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           flexDirection: "column",
  //           transition: "opacity 0.1s ease",
  //           pointerEvents: "none",
  //         }}
  //       >
  //         <img
  //           src={
  //             post.selectedFile ||
  //             "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
  //           }
  //           alt=""
  //           style={{
  //             width: 100,
  //             height: 100,
  //             borderRadius: `100%`,
  //             marginBottom: 10,
  //           }}
  //         ></img>
  //       </div>
  //     ) : null}
  //   </div>
  // );
};

export default UPost;
