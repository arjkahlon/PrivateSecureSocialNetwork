import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from "@material-ui/core";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// const drawerWidth = 240;

// const Sidebar2 = () => {
//   return (
//     <Box sx={{ display: 'flex' }}>
    
//     </Box>
//   );
// }

// export default Sidebar2;

export default function BoxComponent() {
    return (
      <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
        <Button>Save</Button>
      </Box>
    );
  }
