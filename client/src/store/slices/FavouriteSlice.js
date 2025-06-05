import { createSlice } from "@reduxjs/toolkit";
import {
    addToFavorites,
    removeFromFavorites,
    getUserFavorites
} from "../thunks/FavouriteThunk.js";

const initialState = {
    favorites: [],
    loading: false,
    error: null,
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        resetFavorites: (state) => {
            state.favorites = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get
            .addCase(getUserFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(getUserFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.favorites.push(action.payload);
            })
            .addCase(addToFavorites.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Remove
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.favorites = state.favorites.filter(fav => fav.propertyId._id !== action.payload);
            })
            .addCase(removeFromFavorites.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { resetFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
