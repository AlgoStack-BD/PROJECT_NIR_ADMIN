import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
// logo and images
import nirLogo from '../../assets/img/nir_light.svg';
import dashboardIcon from '../../assets/img/drawer/dashboard.svg';
import generalIcon from '../../assets/img/drawer/general.svg';
import pendingIcon from '../../assets/img/drawer/pending-post.svg';
import profileIcon from '../../assets/img/drawer/profile.svg';
import revenueIcon from '../../assets/img/drawer/revenue.svg';
import usersIcon from '../../assets/img/drawer/users.svg';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function CustomList({ icon, text, link }) {
    return (
        <ListItem key={1} disablePadding sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <NavLink
                to={`/dashboard/${link}`}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "green" : "inherit",
                        textDecoration: "none",
                        width: "100%",
                        borderBottom: isActive ? "1px solid #E5E5E5" : "none",
                    };
                }}

            >
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 3,
                    }}
                >
                    <img src={icon} alt="icon" style={{ marginRight: '25px', width: '20px' }} />
                    <ListItemText sx={{ opacity: open ? 1 : 0 }} > {text} </ListItemText>
                </ListItemButton>
            </NavLink>

        </ListItem>

    )
}

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const location = useLocation();
    // console.log(location.pathname)
    const pathText = location.pathname.split('/')[2].toUpperCase();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}
            <AppBar position="fixed" open={open} style={{
                background: '#fff',
                boxShadow: 'none',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <Toolbar >
                    <IconButton onClick={toggleDrawer}>
                        {
                            open ? <ChevronLeftIcon /> : <MenuIcon />
                        }
                    </IconButton>
                    {/* show route path here */}
                    <Box sx={{ display: 'flex', width: "100%", justifyContent: 'space-between', color: "#000" }}>
                        <Typography variant="h6" noWrap sx={{ display: 'flex', alignItems: 'center' }}>
                            {pathText}
                        </Typography>
                        {
                            open &&
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={nirLogo} alt="avater" style={{ height: '30px', width: '30px', borderRadius: '50%' }} />
                                <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, ml: 1 }}>
                                    Mahinur Rahman
                                </Typography>
                            </Box>
                        }

                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} style={{ background: '#000' }}>
                <DrawerHeader>
                    {
                        open && <img src={nirLogo} alt="NIR Logo" style={{ width: '100%', height: '50px', marginRight: '40px' }} />
                    }
                </DrawerHeader>
                {/* here is icon and text for sidebar */}
                <List>
                    <CustomList icon={generalIcon} text="Home" link="home" />
                    <CustomList icon={dashboardIcon} text="Dashboard" link="dashboard" />
                    <CustomList icon={profileIcon} text="Profile" link="profile"/>
                    <CustomList icon={usersIcon} text="Users" link="users" />
                    <CustomList icon={pendingIcon} text="Pending Post" link="pendingPost" />
                    <CustomList icon={revenueIcon} text="Total Revenue" link="totalRevenue" />

                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}