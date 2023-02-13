import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import ClassIcon from '@mui/icons-material/Class';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import {
  Collapse,
  Typography,
  Drawer,
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  styled,
  Toolbar,
} from '@mui/material';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const styles = {
  flex: 'w-full flex justify-between',
};

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const TopSection = styled(Box)`
  display: flex;
  height: 64px;
  align-items: center;
  margin: 0 1rem 1rem;
`;

const ResponsiveDrawer: React.FC<Props> = ({ children }, props: Props) => {
  const router = useRouter();
  const [userToken, setUserToken] = React.useState();
  const [role, setRole] = React.useState();

  React.useEffect(() => {
    const token: any = Cookies.get('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setUserToken(decodedToken);
      setRole(decodedToken.role);
      if (decodedToken.role === 'User' || decodedToken.role === 'Member') {
        router.push('/');
      }
    }
  }, [router]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openCampus, setOpenCampus] = React.useState(true);
  const [openOrganisations, setOpenOrganisations] = React.useState(true);
  const [openUsers, setOpenUsers] = React.useState(true);
  const [openCategories, setOpenCategories] = React.useState(true);
  const [openInvitations, setOpenInvitations] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCampusClick = () => {
    setOpenCampus((prev) => !prev);
  };

  const handleOrganisationsClick = () => {
    setOpenOrganisations((prev) => !prev);
  };

  const handleUsersClick = () => {
    setOpenUsers((prev) => !prev);
  };

  const handleCategoriesClick = () => {
    setOpenCategories((prev) => !prev);
  };

  const handleInvitationsClick = () => {
    setOpenInvitations((prev) => !prev);
  };

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <TopSection>
        <a href='/'>Home</a>
      </TopSection>
      <>
        <List>
          <a href='/edit/campus'>
            <ListItemButton sx={{ pl: 4 }} key={'Campussen'}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary={'Campussen'} />
            </ListItemButton>
          </a>
        </List>

        <Divider />

        <List>
          <a href='/edit/program'>
            <ListItemButton sx={{ pl: 4 }} key={'Opleidingen'}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary={'Opleidingen'} />
            </ListItemButton>
          </a>
        </List>

        <Divider />

        <List>
          <a href='/edit/organisation'>
            <ListItemButton sx={{ pl: 4 }} key={'Organisaties'}>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary={'Organisaties'} />
            </ListItemButton>
          </a>
        </List>

        <Divider />

        <List>
          <a href='/edit/categories'>
            <ListItemButton sx={{ pl: 4 }} key={'Categorieën'}>
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary={'Categorieën'} />
            </ListItemButton>
          </a>
        </List>

        <Divider />

        <List>
          <a href='/edit/initiatives'>
            <ListItemButton sx={{ pl: 4 }} key={'Initiatieven'}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={'Initiatieven'} />
            </ListItemButton>
          </a>
        </List>

        <Divider />

        <List>
          <ListItemButton key={'Organisations'} onClick={handleUsersClick}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Gebruikers'} />
            {openUsers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openUsers} timeout='auto'>
            <List>
              <a href='/edit/users'>
                <ListItemButton sx={{ pl: 4 }} key={'Alle Gebruikers'}>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Alle Gebruikers'} />
                </ListItemButton>
              </a>
              <a href='/edit/users/admin'>
                <ListItemButton sx={{ pl: 4 }} key={'Administrators'}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Administrators'} />
                </ListItemButton>
              </a>
            </List>
          </Collapse>
        </List>

        <Divider />

        <List>
          <ListItemButton key={'Invitations'} onClick={handleInvitationsClick}>
            <ListItemIcon>
              <MoveToInboxIcon />
            </ListItemIcon>
            <ListItemText primary={'Uitnodigingen'} />
            {openInvitations ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openInvitations} timeout='auto'>
            <List>
              <a href='/edit/invitations/organisations'>
                <ListItemButton sx={{ pl: 4 }} key={'Organisatie Leden'}>
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Organisatie Leden'} />
                </ListItemButton>
              </a>
              <a href='/edit/invitations/initiatives'>
                <ListItemButton sx={{ pl: 4 }} key={'Initiatieven'}>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Initiatieven'} />
                </ListItemButton>
              </a>
            </List>
          </Collapse>
        </List>
      </>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position='fixed'
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <div className={styles.flex}>
              <Typography variant='h6' noWrap component='div'>
                Campus in de Buurt
              </Typography>
              {/* <Switch checked={darkMode} onChange={() => toggleTheme()} /> */}
            </div>
          </Toolbar>
        </AppBar>
        <Box
          component='nav'
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label='mailbox folders'
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <main>{children}</main>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ResponsiveDrawer;
