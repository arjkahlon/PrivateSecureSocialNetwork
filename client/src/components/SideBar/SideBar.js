import React, { useState, useEffect } from "react";
import { Typography, Toolbar, Avatar, Button, AppBar } from "@material-ui/core";
import { ProSidebar, Menu, MenuItem, SubMenu, FaHeart, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Link, useHistory, useLocation } from "react-router-dom";
import { getUser } from "../../actions/users";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import Popup from "reactjs-popup";
import hourglass from "../../images/hourglass-sand-timer-Q9xEnN9-600.jpg";
import './Sidebar.scss';
import { FaHashtag } from 'react-icons/fa';
// import 'react-pro-sidebar/dist/css/styles.css';

//import "reactjs-popup/dist/index.css";

//import "reactjs-popup/dist/index.css";

import { GoogleLogin } from "react-google-login";
import { AUTH } from "../../constants/actionTypes";
import Icon from "../Auth/icon";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";
import "./Sidebar.css";

const Sidebar = () =>  {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggle = () => {
    setState(!state);
  };

  const style = {}

//   const user = localStorage.get()
//   const loggedinUser = getUser(user?.email)

  return (
    <React.Fragment>
      <div id = "sidebar">
        <ProSidebar className = {classes.appBar}>
            <div id="header">
              <Menu/>
              <Menu/>
              <Menu/>
              <Menu/>
              <Menu/>
              <Menu/>
              <Menu iconShape="circle">
                <MenuItem>
                  <div>
                      <Button 
                          onClick={toggle}
                          className = {classes.postfilter}
                      >
                          {state ? 'Following' : 'Home'}
                      </Button>
                  </div>
                </MenuItem>
                <SubMenu title="Followers">
                </SubMenu>
                <SubMenu 
                  title="Tags"
                  icon={<FaHashtag style = {style}/>}>
                </SubMenu>
              </Menu>
              <SidebarFooter>
                GitHub here!
              </SidebarFooter>
            </div>
          </ProSidebar>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
