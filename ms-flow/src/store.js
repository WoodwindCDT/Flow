import { configureStore } from "@reduxjs/toolkit";
import allReducers from './reducers';

const STORE = configureStore({
    reducer: allReducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
});

export default STORE;