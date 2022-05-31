import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Home from "./components/Home/Home";
import Home2 from "./components/Home/Home2";
import Home3 from "./components/User/Home3";
import SignIN from "./components/SignIn/SignIn";
import CreatorOrTag from './components/PostDetails/OtherUsersAndTags';

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/abc" />} />
          <Route path="/abc" exact component={SignIN} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/Home" exact component={Home2} />
          <Route path="/User" exact component={Home3} />
          <Route path="/Homes" exact component={Home} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
