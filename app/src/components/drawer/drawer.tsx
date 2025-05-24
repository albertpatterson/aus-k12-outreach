import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import { useBuildUrl } from '../../util/url';

export interface MyDrawerProps {
  open: boolean;
  handleClose: () => undefined;
}

export default function MyDrawer(props: MyDrawerProps) {
  const buildUrl = useBuildUrl();
  const navigate = useNavigate();

  const DrawerList = (
    <>
      <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton onClick={() => navigate(buildUrl('home'))}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Contacts" disablePadding>
          <ListItemButton onClick={() => navigate(buildUrl('contacts'))}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Event List" disablePadding>
          <ListItemButton onClick={() => navigate(buildUrl('event-list'))}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Events List" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Event Map" disablePadding>
          <ListItemButton onClick={() => navigate(buildUrl('event-map'))}>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Events Map" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Drawer
      open={props.open}
      onClose={props.handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          // Target the paper element within the Drawer
          backgroundColor: 'white',
        },
      }}
    >
      <Box sx={{ width: 250 }} role="presentation" onClick={props.handleClose}>
        {DrawerList}
      </Box>
    </Drawer>
  );
}
