import React, {useRef} from "react";
import { CssBaseline } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import useStyles from './styles';
import useAlan from "./Alan";
import {Actors, MovieInfo, Movies, NavigationBar, Profile} from './';
const App = () => {
  const classes = useStyles();
  const alanButtonContainer = useRef();
  useAlan();
  return (
    <div className= {classes.root}>
      <CssBaseline />
      <NavigationBar/>
      <main className = {classes.content}>
      <div className={classes.toolbar}/>
        {/* switch for the different routes to show to user as only one route can be shown at a time */}
        <Switch>
          <Route exact path= "/movie/:id">
            <MovieInfo/>
          </Route>

          <Route exact path= "/actors/:id">
            <Actors/>
          </Route>

          <Route exact path={["/", "/approved"]}>
            <Movies />
          </Route>

          <Route exact path = "/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
      <div ref={alanButtonContainer}/>
    </div>
  );
};

export default App;
