import { createSlice } from "@reduxjs/toolkit";
import {
    fetchFavoriteServices,
    addFavoriteService,
    removeFavoriteService,
} from "../thunks/FavouriteServiceThunk";

const favoriteServicesSlice = createSlice({
    name: "favoriteServices",
    initialState: {
        favorites: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavoriteServices.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(fetchFavoriteServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addFavoriteService.fulfilled, (state, action) => {
                const newFav = action.payload;
                const exists = state.favorites.some(fav => {
                    const id = typeof fav.serviceProviderId === 'string' ? fav.serviceProviderId : fav.serviceProviderId._id;
                    return id === (newFav.serviceProviderId._id || newFav.serviceProviderId);
                });

                if (!exists) {
                    state.favorites.push(newFav);
                }
            })
            .addCase(removeFavoriteService.fulfilled, (state, action) => {
                const removedId = action.meta.arg;
                state.favorites = state.favorites.filter((fav) => {
                    const id = typeof fav.serviceProviderId === 'string' ? fav.serviceProviderId : fav.serviceProviderId._id;
                    return id !== removedId;
                });
            });
    },
});

export default favoriteServicesSlice.reducer;
