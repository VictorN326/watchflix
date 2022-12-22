import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState: {
        genreIdOrCategoryName: '',
        page: 1,
        searchQuery: '',
    },
    reducers: {
        selectGenreOrCategory: (state, action) => {
            // checking to see if we get access to different categories with console.log(action.payload);
             state.genreIdOrCategoryName = action.payload;
             // if we want to search for a category or genre, we need to reset searchQuery with the line below
             state.searchQuery = '';
        },
        searchMovie: (state,action)=> {
            console.log('TESTING SEARCHMOVIE REDUCERS ',action.payload)
            state.searchQuery = action.payload;
        },
    },
});

export const {selectGenreOrCategory, searchMovie} = genreOrCategory.actions;

export default genreOrCategory.reducer;