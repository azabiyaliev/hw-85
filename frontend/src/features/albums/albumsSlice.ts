import {IAlbum, IAlbumRes} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchAlbums} from "../store/thunks/thunks.ts";
import {deleteAlbumById, postAlbum} from "./albumsThunk.ts";

interface albumsState {
    albumsRes: IAlbumRes[];
    albumPost: IAlbum | null;
    isLoading: boolean;
    isLoadingPost: boolean
    isLoadingDelete: boolean;
}

const initialState: albumsState = {
    albumsRes: [],
    albumPost: null,
    isLoading: false,
    isLoadingPost: false,
    isLoadingDelete: false,
}

export const albumsResponse = (state: RootState) => state.albums.albumsRes;
export const isLoading = (state: RootState) => state.albums.isLoading;
export const selectLoadingAlbumPost = (state: RootState) => state.albums.isLoadingPost;
export const selectLoadingAlbumDelete = (state: RootState) => state.albums.isLoadingPost;

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
            .addCase(postAlbum.pending, (state) => {
                state.isLoadingPost = true
            })
            .addCase(postAlbum.fulfilled, (state) => {
                state.isLoadingPost = false
            })
            .addCase(postAlbum.rejected, (state) => {
                state.isLoadingPost = false
            })
            .addCase(deleteAlbumById.pending, (state) => {
                state.isLoadingDelete = true
            })
            .addCase(deleteAlbumById.fulfilled, (state) => {
                state.isLoadingDelete = false
            })
            .addCase(deleteAlbumById.rejected, (state) => {
                state.isLoadingDelete = false
            })

    }
})

export const albumsReducer = albumsSlice.reducer