import {IArtist, IArtistRes} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchArtists} from "../store/thunks/thunks.ts";
import {RootState} from "../../app/store.ts";
import {postArtist} from "./artistsThunk.ts";

interface artistsState {
    artistsRes: IArtistRes[],
    artistPost: IArtist | null,
    isLoading: boolean,
    isLoadingPost: boolean
}

const initialState: artistsState = {
    artistsRes: [],
    artistPost: null,
    isLoading: false,
    isLoadingPost: false,
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

    }
})

export const artistsReducer = artistsSlice.reducer;