import {IArtist, IArtistRes} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchArtists} from "./artistsThunk.ts";
import {RootState} from "../../app/store.ts";
import {deleteArtistById, postArtist, togglePublished} from "./artistsThunk.ts";

interface artistsState {
    artistsRes: IArtistRes[],
    artistPost: IArtist | null,
    isLoading: boolean,
    isLoadingPost: boolean,
    isLoadingDelete: boolean,
    isLoadingPublished: boolean,
}

const initialState: artistsState = {
    artistsRes: [],
    artistPost: null,
    isLoading: false,
    isLoadingPost: false,
    isLoadingDelete: false,
    isLoadingPublished: false,
}

export const artistsResponse = (state: RootState) => state.artists.artistsRes;
export const isLoading = (state: RootState) => state.artists.isLoading;
export const artistPost = (state: RootState) => state.artists.artistPost
export const selectLoadingArtistPost = (state: RootState) => state.artists.isLoadingPost

export const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchArtists.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchArtists.fulfilled, (state, action: PayloadAction<IArtistRes[]>) => {
                state.artistsRes = action.payload
                state.isLoading = false
            })
            .addCase(fetchArtists.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(postArtist.pending, (state) => {
                state.isLoadingPost = true
            })
            .addCase(postArtist.fulfilled, (state) => {
                state.isLoadingPost = false
            })
            .addCase(postArtist.rejected, (state) => {
                state.isLoadingPost = false
            })
            .addCase(deleteArtistById.pending, (state) => {
                state.isLoadingDelete = true;
            })
            .addCase(deleteArtistById.fulfilled, (state) => {
                state.isLoadingDelete = false;
            })
            .addCase(deleteArtistById.rejected, (state) => {
                state.isLoadingDelete = false;
            })
            .addCase(togglePublished.pending, (state) => {
                state.isLoadingPublished = true;
            })
            .addCase(togglePublished.fulfilled, (state) => {
                state.isLoadingPublished = false;
            })
            .addCase(togglePublished.rejected, (state) => {
                state.isLoadingPublished = false;
            })

    }
})

export const artistsReducer = artistsSlice.reducer;