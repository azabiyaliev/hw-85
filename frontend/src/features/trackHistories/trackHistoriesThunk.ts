import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITrackHistory, ITrackHistoryRes} from "../../types";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axiosAPI.ts";

export const trackHistoryFetch = createAsyncThunk<void, ITrackHistory, {state: RootState}>(
    'trackHistory/trackHistoryFetch',
    async (trackHistory: ITrackHistory, {getState}) => {
        const token = getState().users.user?.token;
        await axiosAPI.post("/trackHistories", trackHistory, {headers: {'Authorization': token}});

    }
)

export const trackHistoryGet = createAsyncThunk<ITrackHistoryRes[], void, {state: RootState}>(
    "tracksHistory/trackHistoryGet",
    async (_, {getState})=> {
        const token = getState().users.user?.token;
        const response = await axiosAPI.get<ITrackHistoryRes[]>("/trackHistories",{headers: {'Authorization': token}});
        return response.data || [];
    });