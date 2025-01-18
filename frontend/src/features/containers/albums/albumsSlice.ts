import {IAlbumRes} from "../../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store.ts";
import {fetchAlbums} from "../store/thunks/thunks.ts";

interface albumsState {
    albumsRes: IAlbumRes[];
    isLoading: boolean;
}

const initialState: albumsState = {
    albumsRes: [],
    isLoading: false,
}

export const albumsResponse = (state: RootState) => state.albums.albumsRes;
export const isLoading = (state: RootState) => state.albums.isLoading;

export const albumsSlice = createSlice({
    name: "albums",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAlbums.fulfilled, (state, action: PayloadAction<IAlbumRes[]>) => {
                state.albumsRes = action.payload
                state.isLoading = false
            })
            .addCase(fetchAlbums.rejected, (state) => {
                state.isLoading = false
            })

    }
})

export const albumsReducer = albumsSlice.reducer