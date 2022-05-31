import React from "react";

import { ProSidebar, Menu, MenuItem, SubMenu, FaHeart, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';

import './Sidebar.scss';
import { FaHashtag } from 'react-icons/fa';

import useStyles from "./styles";
import "./SideBar.css";

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
              <Menu iconShape="circle">
                <MenuItem>
                  <div>
                  </div>
                </MenuItem>
                <SubMenu title="Followers">
                </SubMenu>
                <SubMenu 
                  title="Tags"
                  icon={<FaHashtag style = {style}/>}>
                </SubMenu>
              </Menu>
              <SidebarFooter style={{ textAlign: "center"}}>
                <div
                  className="sidebar-footer"
                  style={{
                    padding: "20px 24px"
                  }}
                >
                  GitHub here!
                </div>
              </SidebarFooter>
            </div>
          </ProSidebar>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
