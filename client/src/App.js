import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Home2 from "./components/Home/Home2";
import Home3 from "./components/User/Home3";

const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/Home" exact component={Home2} />
          <Route path="/User" exact component={Home3} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
