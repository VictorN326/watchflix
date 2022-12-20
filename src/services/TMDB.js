import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { buildQueries } from '@testing-library/react';
const page = 1;
//  const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const tmdbApiKey = '4a1c5a07df1f8aaa6cab280c2b4e5796';
// /movie/popular?api_key=<<api_key>>&language=en-US&page=1
export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://api.themoviedb.org/3'}),
    endpoints:(builder) => ({
        //*Get Genres
        getGenres: builder.query({
            query: ()=> `genre/movie/list?api_key=${tmdbApiKey}`
        }),
        //*Get Movies by [Type]
        getMovies: builder.query({
            query: ({genreIdOrCategoryName, page}) => {
                //* Get Movies by Category
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }
                console.log(genreIdOrCategoryName);
                //* Get Movies by Genres
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    console.log('TESTING IF THIS WORKS FOR GENRES!')
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }

                //* Get Popular Movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
} = tmdbApi;