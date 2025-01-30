import {ITrackRes} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTracks} from "../store/thunks/thunks.ts";
import {RootState} from "../../app/store.ts";
import {postTrack} from "./tracksThunk.ts";

interface tracksState {
    tracksRes: ITrackRes[];
    isLoading: boolean;
    isLoadingPost: boolean;
}

const initialState: tracksState = {
    tracksRes: [],
    isLoading: false,
    isLoadingPost: false,
}


export const tracksResponse = (state: RootState) => state.tracks.tracksRes;
export const isLoading = (state: RootState) => state.tracks.isLoading;
export const selectLoadingTrackPost = (state: RootState) => state.tracks.isLoadingPost;


export const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(fetchTracks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchTracks.fulfilled, (state, action: PayloadAction<ITrackRes[]>) => {
                state.tracksRes = action.payload
                state.isLoading = false
            })
            .addCase(fetchTracks.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(postTrack.pending, (state) => {
                state.isLoadingPost = true
            })
            .addCase(postTrack.fulfilled, (state) => {
                state.isLoadingPost = false
            })
            .addCase(postTrack.rejected, (state) => {
                state.isLoadingPost = false
            })

    }
})

export const tracksReducer = tracksSlice.reducer;
