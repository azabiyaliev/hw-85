import {ITrack} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axiosAPI.ts";

export const postTrack = createAsyncThunk<void, ITrack, { state: RootState }>(
    "tracks/postTrack",
    async (ITrack, { getState }) => {

        const token = getState().users.user?.token;

        await axiosAPI.post("/tracks", ITrack, {
            headers: {'Authorization': token},
        });
        console.log(token);
    },
);