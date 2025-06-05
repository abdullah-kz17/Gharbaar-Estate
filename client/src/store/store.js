import {configureStore} from "@reduxjs/toolkit";
import propertyReducer from './slices/PropertySlice.js';
import favoriteReducer from './slices/FavouriteSlice.js';
import serviceProviderReducer from './slices/ServiceProviderSlice.js';
import favoriteServicesReducer from './slices/FavoruiteServiceSlice.js';
import adminUsersReducer from './slices/userSlice.js';

const store = configureStore({
  reducer: {
    property: propertyReducer,
    favorite: favoriteReducer,
    serviceProvider: serviceProviderReducer,
    favoriteServices: favoriteServicesReducer,
    adminUsers:adminUsersReducer
  },
});

export default store;
