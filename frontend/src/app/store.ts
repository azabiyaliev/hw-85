import { configureStore } from "@reduxjs/toolkit";
import {artistsReducer} from "../features/containers/artists/artistsSlice.ts";
import {albumsReducer} from "../features/containers/albums/albumsSlice.ts";


export const store = configureStore({
  reducer:{
    artists: artistsReducer,
    albums: albumsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;