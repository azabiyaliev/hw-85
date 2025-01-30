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

export const deleteTrackById = createAsyncThunk<void, string,  {state: RootState }>(
    "tracks/deleteTrackById",
    async (id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosAPI.delete(`/tracks/${id}`, {headers: {'Authorization': token}});
    }
)

export const togglePublishedTrack = createAsyncThunk<void, string,  {state: RootState }>(
    "albums/togglePublishedTrack",
    async (id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosAPI.patch(`/tracks/${id}/togglePublished`, {headers: {'Authorization': token}});
    }
)