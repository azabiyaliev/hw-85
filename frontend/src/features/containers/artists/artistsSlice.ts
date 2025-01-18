import {IArtistRes} from "../../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchArtists} from "../store/thunks/thunks.ts";
import {RootState} from "../../../app/store.ts";


interface artistsState {
    artistsRes: IArtistRes[],
    isLoading: boolean;
}

const initialState: artistsState = {
    artistsRes: [],
    isLoading: false,
}

export const artistsResponse = (state: RootState) => state.artists.artistsRes;
export const isLoading = (state: RootState) => state.artists.isLoading;

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

    }
})

export const artistsReducer = artistsSlice.reducer;