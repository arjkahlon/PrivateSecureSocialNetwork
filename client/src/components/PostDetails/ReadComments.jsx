import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const ReadCommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
        <Typography variant="h1" color="primary" component="h1">
            I work
        </Typography>
        <Typography gutterBottom color="primary" variant="h6">
            Comments
        </Typography>
        {comments?.map((c, i) => (
            <Typography key={i} gutterBottom color="primary" variant="subtitle1">
              {/* <strong>{c.split(': ')[0]}</strong> */}
              Hello
              {/* {c.split(':')[1]} */}
            </Typography>
          ))}
        <div ref={commentsRef} />
    </div>
  );
};

export default ReadCommentSection;
