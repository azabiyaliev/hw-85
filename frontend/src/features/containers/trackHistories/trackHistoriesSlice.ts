import {ITrackHistoryRes} from "../../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store.ts";
import {trackHistoryFetch, trackHistoryGet} from "../store/thunks/thunks.ts";

interface trackHistoriesState {
    tracksHistoriesRes: ITrackHistoryRes[];
    isLoading: boolean;
}

const initialState: trackHistoriesState = {
    tracksHistoriesRes: [],
    isLoading: false,
}


export const tracksHistoriesResponse = (state: RootState) => state.trackHistories.tracksHistoriesRes;
export const isLoading = (state: RootState) => state.trackHistories.isLoading;


export const trackHistoriesSlice = createSlice({
    name: "trackHistories",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(trackHistoryFetch.pending, (state) => {
                state.isLoading = true
            })
            .addCase(trackHistoryFetch.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(trackHistoryFetch.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(trackHistoryGet.pending, (state) => {
                state.isLoading = true
            })
            .addCase(trackHistoryGet.fulfilled, (state, action: PayloadAction<ITrackHistoryRes[]>) => {
                state.tracksHistoriesRes = action.payload
                state.isLoading = false
            })
            .addCase(trackHistoryGet.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export const trackHistoriesReducer = trackHistoriesSlice.reducer;
