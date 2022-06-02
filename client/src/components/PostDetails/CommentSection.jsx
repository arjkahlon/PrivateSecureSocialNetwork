import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";
import useStyles from "./styles";
import moment from 'moment';

const CommentSection = ({ post, life, setLife }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    try {
      setComments([...comments, `${user?.result?.name}: ${comment}`]);
      let tempComment = comment;
      setComment("");
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
      setLife(moment(life).add(60, 'm').toDate());
      dispatch(commentPost(`${user?.result?.name}: ${tempComment}`, post._id));

    } catch {}
  };

  return (
    <div style={{ color: "rgb(0,0,0)" }}>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: "50%" }}>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Write a Comment"
            multiline
            value={comment}
            disabled={!user?.result}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment.length || !user?.result}
            color="primary"
            variant="contained"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
