import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MyDrawer from '../drawer/drawer';

export default function MyAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
    return undefined;
  };

  const closeDrawer = () => {
    setOpen(false);
    console.log('closeDrawer');
    return undefined;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Austin K12 Outreach
          </Typography>
          {/* hack to center the title */}
          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>
      <MyDrawer open={open} handleClose={closeDrawer} />
    </>
  );
}
