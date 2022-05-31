import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Button } from "@material-ui/core";
import { ProSidebar, Menu, MenuItem, SubMenu, FaHeart, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../SideBar/SideBar";
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import githubImage from "./githubImage.png";

import { FaHashtag } from 'react-icons/fa';



const Home = () => {
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [followingPage, setFollowingPage] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  // const loggedInUser = getUser(user?.email);

  const handleFollowingPage = () => {
    if (followingPage) {
      setFollowingPage(false);
    } else {
      setFollowingPage(true);
    }
  };

  return (
    <Grow in>
      <Container>
        <Navbar />
        <React.Fragment>
          <div id = "sidebar">
            <ProSidebar className = {classes.appBar}>
                <div id="header">
                  <Menu iconShape="circle">
                    <MenuItem>
                      <div>
                      <Button onClick={handleFollowingPage} className={classes.popup} color = "secondary">
                          {followingPage ? "Following" : "Home"}
                      </Button>
                      </div>
                    </MenuItem>
                    <SubMenu title="Following">
                    </SubMenu>
                    <SubMenu 
                      title="Tags"
                      icon={<FaHashtag />}>
                    </SubMenu>
                  </Menu>
                  <SidebarFooter style={{ textAlign: "center"}}>
                    <div
                      className="sidebar-footer"
                      style={{
                        padding: "20px 24px"
                      }}
                    >
                     <p>
                        This is an open source website. Build your own version of the website by
                        cloning from GitHub: &nbsp;
                        <a href="https://github.com/arjkahlon/PrivateSecureSocialNetwork">
                          <img className={classes.image} src={githubImage} alt="icon" />
                        </a>
                      </p>
                    </div>
                  </SidebarFooter>
                </div>
              </ProSidebar>
          </div>
        </React.Fragment>
        {/* <Sidebar2 /> */}
        <Grid
          container
          direction="row"
          alignItems="stretch"
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            {/* if (!handleFollowingPage)
            { */}
            <Posts setCurrentId={setCurrentId} showFollowers={followingPage} />
            {/* } */}
          </Grid>
          {/* <Footer /> */}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
