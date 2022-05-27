import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import { getPosts } from "../../actions/posts";
import Form from "../Form/Form";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
const Home2 = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Form currentId={currentId} setCurrentId={setCurrentId} />
      <Footer />
    </Container>
  );
};

export default Home2;
