import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";

import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const calculateTimeLeft = () => {
    let difference = 86400000 + moment(post.createdAt)-(new Date());
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference)/3600000),
        minutes: Math.floor((difference)/60000)%60,
        seconds: Math.floor((difference)/1000)%60
      };
    }

    return timeLeft;
  }

  const user = JSON.parse(localStorage.getItem("profile"));
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
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.details}>
  <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#000' }}>
      <Typography variant="h6">{post.name}</Typography>
  </Link>
        <Typography variant="body2" >{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>

  // return (
  //   <Card className={classes.card} raised elevation={6}>
  //     <ButtonBase
  //       component="span"
  //       name="test"
  //       className={classes.cardAction}
  //       onClick={openPost}
  //     >
  //       <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
  //       <div className={classes.details}>
  // <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#000' }}>
  //     <Typography variant="h6">{post.name}</Typography>
  // </Link>
  //       <Typography variant="body2">{Math.floor((86400000 + moment(post.createdAt)-(new Date()).getTime())/3600000)%24}:{Math.floor((86400000 + moment(post.createdAt)-(new Date()).getTime())/60000)%60}:{Math.floor((86400000 + moment(post.createdAt)-(new Date()).getTime())/1000)%60}</Typography>
  //       </div>
  //       <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
  //       <CardContent>
  //         <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
  //       </CardContent>
  //     </ButtonBase>
  //     <CardActions className={classes.cardActions}>
  //       <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
  //         <Likes />
  //       </Button>
  //       {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
  //         <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
  //           <DeleteIcon fontSize="small" /> &nbsp; Delete
  //         </Button>
  //       )}
  //     </CardActions>
  //   </Card>
  // );

  return (
    <View style={styles.screen}>
      <Image style={styles.image} source={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
    </View>

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
