import React, {useEffect} from 'react';
import {Divider, List, ListItem, ListItemText, ListItemSubheader, ListItemIcon, Box, CircularProgress, ListSubheader  } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres'
import useStyles from './styles'
import { useDispatch, useSelector} from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
const categories = [
  {label: 'Popular', value: 'popular'},
  {label: 'Top Rated', value: 'top_rated'},
  {label: 'Upcoming', value: 'upcoming'},
];

// const demoCategories = [
//   {label: 'Comedy', value: 'comedy'},
//   {label: 'Action', value: 'action'},
//   {label: 'Horror', value: 'horror'},
//   {label: 'Animation', value: 'animation'}
// ];
//Font maker for application using font meme and netflix font
const redLogo = 'https://fontmeme.com/permalink/221208/671667e1e2ac057db669c22af7815536.png';
const blueLogo = 'https://fontmeme.com/permalink/221208/f06625b2a49486ec4d691980011f62c5.png';
const Sidebar = ({setMobileOpen}) => {
  const {genreIdOrCategoryName} = useSelector((state)=> state.currentGenreOrCategory);
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {data, isFetching} = useGetGenresQuery();

  // console.log('Genre',data);
  console.log(genreIdOrCategoryName);
  return (
    <>
        <Link to="/" className={classes.imageLink}>
            <img className={classes.image}
                src = {theme.palette.mode === 'light' ? blueLogo : redLogo}
                alt = "Watchflix logo"
            />
        </Link>
        <Divider/>
        <List>
          <ListSubheader>Categories</ListSubheader>
          {categories.map(({label, value}) => (
            <Link key={value} className ={classes.links} to='/'>
              <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                <ListItemIcon>
                  <img src = {genreIcons[label.toLowerCase()]} className = {classes.genreImages} height = {30}/>
                </ListItemIcon>
                <ListItemText primary = {label}/>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider/>
        <List>
          <ListSubheader>Genres</ListSubheader>
          {isFetching ? (
            <Box display = "flex" justifyContent="center">
              <CircularProgress/>
            </Box>
          ): data.genres.map(({name, id}) => (
            <Link key={name} className ={classes.links} to='/'>
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                <ListItemIcon>
                  <img src = {genreIcons[name.toLowerCase()]} className = {classes.genreImages} height = {30}/>
                </ListItemIcon>
                <ListItemText primary = {name}/>
              </ListItem>
            </Link>
          ))}
        </List>
    </>
    );
};

export default Sidebar