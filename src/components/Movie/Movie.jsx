import React,{useState, useEffect} from 'react';
import {Box, CircularProgress, useMediaQuery, Typography} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
const Movie = () => {
  const {data} = useGetMoviesQuery();
  console.log(data);
  return (
    <div>
     Movie
    </div>
  );
};

export default Movie;