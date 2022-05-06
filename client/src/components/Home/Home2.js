import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";
import Form from "../Form/Form";

const Home2 = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return <Form currentId={currentId} setCurrentId={setCurrentId} />;
};

export default Home2;
