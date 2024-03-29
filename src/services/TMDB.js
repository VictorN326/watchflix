import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { buildQueries } from '@testing-library/react';
// const page = 1;
 const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
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
            query: ({genreIdOrCategoryName, page, searchQuery}) => {
                //* Get Movies by Search
                if(searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }
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

        //* Get Movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
        }),
        //* Get List
        getList: builder.query({
            query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
        }),
        //* Get user-specific lists
        getRecommendations: builder.query({
            query: ({movie_id, list}) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
        }),
        //* Get Actors/Actresses information
        getActorsInfo: builder.query({
            query: (id)=> `person/${id}?api_key=${tmdbApiKey}`,
        }),
        //* Get other different movies that the actors is played in
        getActorsMovies: builder.query({
            query: ({id, page})=> `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecommendationsQuery,
    useGetActorsInfoQuery,
    useGetActorsMoviesQuery,
    useGetListQuery,
} = tmdbApi;