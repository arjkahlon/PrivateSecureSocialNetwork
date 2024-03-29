import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import FileInputComponent from "react-file-input-previews-base64";
import { useHistory } from "react-router-dom";
import BubbleUI from "react-bubble-ui";
import ChipInput from "material-ui-chip-input";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";
const options = {
  size: 375,
  minSize: 175,
  gutter: 15,
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
const showPreview = ({ base64 }) => {
  return (
    <BubbleUI className={"myBubbleUI"} options={options}>
      {base64}
    </BubbleUI>
  );
};
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
    tags: [],
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );

  const [selectedImage, setSelectedImage] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", selectedFile: "", tags: [] });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  const addChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const deleteChip = (chip) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chip),
    });
  };

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Sign In to Post.
        </Typography>
      </Paper>
    );
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Create a Post"}
        </Typography>
        <TextField
          required
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          InputLabelProps={{
            className: classes.labeltext,
          }}
          InputProps={{
            className: classes.text,
          }}
          className={classes.text}
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          required
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          InputLabelProps={{
            className: classes.labeltext,
          }}
          InputProps={{
            className: classes.text,
          }}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          {
            <FileBase
              type="file"
              imagePreview="true"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          }
        </div>
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
