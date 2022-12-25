import React from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating} from '@mui/material';
import {Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack} from '@mui/icons-material';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
const MovieInfo = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {data, isFetching, error} = useGetMovieQuery(id);
  const classes = useStyles();
  const isMovieFavorite = true;
  const isMovieWatchlisted = false;

  const addToFavorites = () => {

  };

  const addToWatchlist = () => {

  };
  if (isFetching) {
    return (
      <Box display = "flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    )
  }

  if(error) {
    return(
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to='/'>Something has gone wrong- go back</Link>
      </Box>
    )
  }
  console.log('data', data);
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title}/>
      </Grid>
      <Grid item container direction ="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>{data?.title} ({(data.release_date.split('-')[0])})</Typography>
        <Typography variant="h5" align="center" gutterBottom>{data?.tagline}</Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2}/>
            <Typography variant="subtitle1" gutterBottom style={{marginLeft: '10px'}}>{data?.vote_average} / 10</Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>{data?.runtime}min {data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}`: ''}</Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link key={genre.name} className={classes.links} to="/" onClick={()=> dispatch(selectGenreOrCategory(genre.id))}>
              <img src = {genreIcons[genre.name.toLowerCase()]} className = {classes.genreImage} height = {30}/>
              <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
            </Link>
          ))}
        </Grid>

        <Typography variant='h5' gutterBottom style={{marginTop: '10px'}}>Overview</Typography>
        <Typography style={{marginBottom: '2rem'}}>{data?.overview}</Typography>
        <Typography variant='h5' gutterBottom>Top Cast</Typography>

        <Grid item container spacing={2}>
            {data && data.credits?.cast?.map((actor,i) => (
              //show only actors and actresses that have profile pictures for the cast and their role
              actor.profile_path && (
                <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${actor.id}`} style={{textDecoration: 'none'}}> 
                  <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name}/>
                  <Typography color="textPrimary">{actor?.name}</Typography>
                  <Typography color="textSecondary">{actor.character.split('/')[0]}</Typography>
                </Grid>
              )
            )).slice(0,12)}
        </Grid>
        <Grid item container style={{marginTop:'2rem'}}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              {/* Button div that holds different buttons that are links to movies information and website */}
              <ButtonGroup size='small' variant='outlined'>
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language/>}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon/>}>IMDB</Button>
                <Button onClick={()=> {}} href="#" endIcon={<Theaters/>}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              {/* Button div that holds different buttons that are links to movies information and website */}
              <ButtonGroup size='medium' variant='outlined'>
                <Button onClick={addToFavorites} endIcon={isMovieFavorite ? <FavoriteBorderOutlined/>: <Favorite/>}>
                  {isMovieFavorite ? 'Unfavorite': 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove/>: <PlusOne/>}>
                  {/*UNNECESSARY FOR LONG BUTTON: {isMovieWatchlisted ? 'Remove from Watchlist': 'Add to Watchlist'} */}
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack/>} sx={{borderColor: 'primary.main'}}>
                  <Typography component={Link} to="/" color="inherit" variant="subtitle2" style={{textDecoration: 'none'}}>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieInfo;