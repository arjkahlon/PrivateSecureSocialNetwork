import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, Link } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import useStyles from "./styles";
import Navbar from "../Navbar/Navbar";
const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: "none" }));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">
              {post.title}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.message}
            </Typography>
            <Typography variant="h6">
              Created by:
              <Link
                to={`/creators/${post.name}`}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                {` ${post.name}`}
              </Link>
            </Typography>
            <Typography variant="body2">
              {Math.floor(
                (86400000 + moment(post.createdAt) - new Date().getTime()) /
                  3600000
              ) % 24}
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
    </Container>
  );
};

export default Post;