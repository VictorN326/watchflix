import React, {useContext, useEffect, useState} from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { ColorModeContext } from "../../utilities/DarkAndLightMode";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import {useTheme} from "@mui/material/styles";
import {Sidebar, Search} from "..";
import { fetchToken, createSessionId, moviesApi } from "../../utilities";
import { useDispatch, useSelector } from "react-redux";
import {setUser, userSelector} from '../../features/authentication';
const NavigationBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  // const isAuthenticated = false;
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const token = localStorage.getItem('request_token');
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector(userSelector);
  const DarkLightMode = useContext(ColorModeContext);
  console.log(user);
  useEffect(()=> {
    const logInUser = async () => {
      if(token) {
        if(sessionIdFromLocalStorage) {
          // console.log(1);
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          // console.log(2);
          const sessionId = await createSessionId();
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              //set MobileOpen to be in different state than it is currently. Allows to use sidebar when on mobile and is set to false by default
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          {/* DARK AND LIGHT MODE BUTTON */}
          <IconButton color = "inherit" sx = {{ml: 1}} onClick = {DarkLightMode.toggleDarkLightMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4/>}
          </IconButton>
          {!isMobile && <Search/>}
          <div>
            {/* login button when not authenticated or not signed in */}
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle/>
              </Button>
            ): (
              //profile button on top right
              <Button color="inherit" component = {Link} to = {`/profile/${user.id}`} className = {classes.linkButton} onClick = {() => {}}> 
                {!isMobile && <> My Movies &nbsp; </>}
                <Avatar style ={{width:30, height: 30}} alt = 'Profile' src = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" />
              </Button>
            )}
          </div>
          {isMobile && <Search/>}
        </Toolbar>
      </AppBar>
      <div>
        <nav className= {classes.drawer}>
              {isMobile ? (
                <Drawer variant = "temporary" anchor = "right" open = {mobileOpen} onClose = {() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} classes = {{paper:classes.drawerPaper}} ModalProps = {{keepMounted: true}}>
                  <Sidebar setMobileOpen = {setMobileOpen}/>
                </Drawer>
              ): (
                <Drawer classes = {{paper: classes.drawerPaper}} variant ="permanent" open>
                  <Sidebar setMobileOpen={setMobileOpen}/>
                </Drawer>
              )}
        </nav>
      </div>
    </>
  );
};

export default NavigationBar;
