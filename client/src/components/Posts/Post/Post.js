import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useParams, useLocation } from 'react-router-dom';
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
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import PostDetails from "../../PostDetails/PostDetails";
import CommentSection from "../../PostDetails/CommentSection";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getPostsByCreator, getPostsBySearch } from '../../../actions/posts';

import "./styles.css";

import { likePost, deletePost } from "../../../actions/posts";
import { followUser } from "../../../actions/users";
import useStyles from "./styles";

const cardStyle = {
  display: 'block',
  width: '30vw',
  transitionDuration: '0.3s',
  height: '45vw'
}

const Post = ({ post, setCurrentId }) => {

  const { name } = useParams();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [following, setFollowing] = useState(user?.result?.following);
  
  const calculateTimeLeft = () => {
    let difference = 86400000 + moment(post.createdAt) - new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / 3600000),
        minutes: Math.floor(difference / 60000) % 60,
        seconds: Math.floor(difference / 1000) % 60,
      };
    }

    return timeLeft;
  };

  
  const [likes, setLikes] = useState(post?.likes);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
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
        borderColor: "#009E00",
      };
    } else if (value <= 24 && value >= 18) {
      return {
        width: 300,
        height: 300,
        borderRadius: 1000,
        borderWidth: 10,
        borderColor: "#00E200",
      };
    }
    else if (value < 18 && value >= 12) {
      return {
        width: 300,
        height: 300,
        borderRadius: 1000,
        borderWidth: 10,
        borderColor: "#FFE200",
      };
    }
    else if (value < 12 && value >= 6) {
      return {
        width: 300,
        height: 300,
        borderRadius: 1000,
        borderWidth: 10,
        borderColor: "#FF8C00",
      };
    }
    else if (value < 6 && value >= 3) {
      return {
        width: 300,
        height: 300,
        borderRadius: 1000,
        borderWidth: 10,
        borderColor: "#FF5100",
      };
    }
    else if (value < 3) {
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

  const reload = () => {
    window.location.reload();
  }
  const reloadFunction = () => {
    window.location.reload();
    return <></>
  }

  const handleFollow = async () => {
    dispatch(followUser(post.creator));

    if (following.find((follower) => follower === post.creator)) {
      setFollowing(following.filter((id) => id !== post.creator));
    } else {
      setFollowing([...following, post.creator]);
    }
  };

  const Follows = () => {
    if (following) {
      return following.find((follower) => follower === post.creator) ? (
        <>Following</>
      ) : (
        <>Follow</>
      );
    } else {
      return <></>
    }
  };

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
          <Button size="small" color = "primary">
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
            <div> 
            <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                {}
            <CardHeader
              avatar={<Avatar alt={post.name} src={AccountCircleIcon} />}
              title={post.name}
              titleTypographyProps={{ variant: "body1", component: "span", color: "primary", onClick: {reload}}}
              className={classes.cardHeader}
            >
            </CardHeader>
            </Link>
            
            </div>
            <Button
              style={{ marginTop: "10px" }}
              color="primary"
              variant="contained"
              onClick={handleFollow}
            >
              <Follows />
            </Button>
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
            <Typography onClick= {reload} gutterBottom align='center'  variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
              <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                {` #${tag} `}
              </Link>
            ))}
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

            <CommentSection post={post}/>
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

          {/* Commenting on the Bubble UI
          {(user?.result) && (
          <Button size="small" color = "primary" onClick={openPost}>
            <CommentIcon fontSize="small" /> &nbsp; Comment &nbsp; &nbsp;
          </Button>
          )} */}

          {/*Delete on the Bubble UI*/}
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
          )}
        </div>
      </Paper>
    </Popup>
  
  );
  
};


export default Post;
