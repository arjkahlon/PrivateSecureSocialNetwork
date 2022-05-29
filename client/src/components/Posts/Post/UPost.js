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
  Avatar,
  CardHeader,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Popup from "reactjs-popup";
import DeleteIcon from "@material-ui/icons/Delete";
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

  const borderStyle = (value) => {
    if (value > 24) {
      return {
        width: 300,
        height: 300,
        borderRadius: 1000,
        borderWidth: 10,
        borderColor: "#00FF00",
      };
    } else if (value < 4) {
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

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    console.log("Clicked!");
    history.push(`/posts/${post._id}`);
  };

  return (
    <div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
          <Popup
          trigger={
            <figure class= "figure"> 
            <figcaption  align= "center" color = "primary"> <h1><b>{Math.floor(
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
              ) % 60} </b> </h1></figcaption>
            <Button className="post">
            
              <div class="container">
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
              {/*Liking on the Bubble UI*/}
              <Button
                size="small"
                color="primary"
                disabled={!user?.result}
                onClick={handleLike}
              >
                <Likes />
              </Button>
    
              {/*Commenting on the Bubble UI*/}
              {(user?.result) && (
              <Button size="small" color = "primary" onClick={openPost}>
                <CommentIcon fontSize="small" /> &nbsp; Comment &nbsp; &nbsp;
              </Button>
              )}
    
              {/*Delete on the Bubble UI*/}
              {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
              <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize="small" /> &nbsp; Delete
              </Button>
              )}
              </div>
            </Button>
          </figure>
          }
    
          position="right center"
          Modal
          className={classes.popup}
        >
          <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <div className={classes.card}>
              <div className={classes.section}>
                <CardHeader
                  avatar={<Avatar alt={post.name} src={AccountCircleIcon} />}
                  title={post.name}
                  titleTypographyProps={{ variant: "body1", component: "span", color: "primary"}}
                  className={classes.cardHeader}
                />
                <Typography color="secondary" variant="h6" align='center'>
                  {/* <b>Post Dies in: &nbsp;</b> */}
                  <b>{Math.floor(
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
                  ) % 60} </b>
                </Typography>
                <Typography variant="h1" color="primary" component="h1" align='center'>
                  {post.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body1"
                  color="primary"
                  component="p"
                  align = "center"
                >
                  {post.message}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h1"
                  color="primary"
                  component="p"
                >
                  
                </Typography>

                <Typography
                  gutterBottom
                  variant="h1"
                  color="primary"
                  component="p"
                >
                    
                </Typography>
              </div>
              {/*Liking on the Bubble UI*/}
              <Button
                size="small"
                color="primary"
                disabled={!user?.result}
                onClick={handleLike}
              >
                <Likes />
              </Button>

              {/*Commenting on the Bubble UI*/}
              {(user?.result) && (
              <Button size="small" color = "primary" onClick={openPost}>
                <CommentIcon fontSize="small" /> &nbsp; Comment &nbsp; &nbsp;
              </Button>
              )}

              {/*Delete on the Bubble UI*/}
              {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
              <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize="small" /> &nbsp; Delete
              </Button>
              )}
            </div>
          </Paper>
        </Popup>
      )}
    </div>
  );
};

export default UPost;
