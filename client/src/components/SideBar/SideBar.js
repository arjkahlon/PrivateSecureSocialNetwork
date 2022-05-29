import React, { useState, useEffect } from "react";
import { Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Link, useHistory, useLocation } from "react-router-dom";
import { getUser } from "../../actions/users";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import Popup from "reactjs-popup";
import hourglass from "../../images/hourglass-sand-timer-Q9xEnN9-600.jpg";
//import "reactjs-popup/dist/index.css";

//import "reactjs-popup/dist/index.css";

import { GoogleLogin } from "react-google-login";
import { AUTH } from "../../constants/actionTypes";
import Icon from "../Auth/icon";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Sidebar = () => {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggle = () => {
    setState(!state);
  };

//   const user = localStorage.get()
//   const loggedinUser = getUser(user?.email)

  return (
    <React.Fragment>
        <ProSidebar>
            <div>
                <Button 
                    onClick={toggle}
                    className = {classes.popup}
                >
                    {state ? 'Following' : 'Home'}
                </Button>
            </div>
        </ProSidebar>
    </React.Fragment>
  );
};

export default Sidebar;
