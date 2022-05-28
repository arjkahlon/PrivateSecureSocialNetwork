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
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import CommentIcon from '@material-ui/icons/Comment';
import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import PostDetails from "../../PostDetails/PostDetails";
import CommentSection from "../../PostDetails/CommentSection";
import ReadCommentSection from "../../../components/PostDetails/ReadComments";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import "./styles.css";

import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const cardStyle = {
  display: 'block',
  width: '30vw',
  transitionDuration: '0.3s',
  height: '45vw'
}

const Post = ({ post, setCurrentId }) => {
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
  

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`} &nbsp; &nbsp;
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"} &nbsp; &nbsp;
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like &nbsp; &nbsp;
      </>
    );
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    console.log("Clicked!");
    history.push(`/posts/${post._id}`);
  };

  const Modal = () => (
    <Popup trigger={<button className="button"> </button>} modal>
      <span> Modal content </span>
    </Popup>
  );

  return (
    
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
    
    // <View style={styles.screen}>
    //   <Image
    //     style={styles.image}
    //     source={
    //       post.selectedFile ||
    //       "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
    //     }
    //   />
    // </View>
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


export default Post;
