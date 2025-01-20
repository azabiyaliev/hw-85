import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/containers/artists/artistsSlice.ts";
import {albumsReducer} from "../features/containers/albums/albumsSlice.ts";
import {tracksReducer} from "../features/containers/tracks/tracksSlice.ts";
import {usersReducer} from "../features/containers/users/usersSlice.ts";
import storage from "redux-persist/lib/storage";
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore} from 'redux-persist';


const userPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: persistReducer(userPersistConfig, usersReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;