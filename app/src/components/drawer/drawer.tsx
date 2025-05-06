import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export interface MyDrawerProps {
  open: boolean;
  handleClose: () => undefined;
}

export default function MyDrawer(props: MyDrawerProps) {
  console.log('MyDrawer props', props);

  const navigate = useNavigate();

  const DrawerList = (
    <>
      <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton onClick={() => navigate('/home')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Contacts" disablePadding>
          <ListItemButton onClick={() => navigate('/contacts')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Event List" disablePadding>
          <ListItemButton onClick={() => navigate('/event-list')}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Events List" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Event Map" disablePadding>
          <ListItemButton onClick={() => navigate('/event-map')}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Events Map" />
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </>
    // </Box>
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
