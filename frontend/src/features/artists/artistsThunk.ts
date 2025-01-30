import {IArtist} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axiosAPI.ts";

export const postArtist = createAsyncThunk<void, IArtist, { state: RootState }>(
    "artists/postArtist",
    async (IArtist, { getState }) => {

        const token = getState().users.user?.token;

        const formData = new FormData();

        const keys = Object.keys(IArtist) as (keyof IArtist)[];

        keys.forEach((key) => {
            const value = IArtist[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post("/artists", formData, {
            headers: {'Authorization': token},
        });
    },
);

export const deleteArtistById = createAsyncThunk<void, string,  {state: RootState }>(
    "artists/deleteArtistById",
    async (id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosAPI.delete(`/artists/${id}`, {headers: {'Authorization': token}});
    }
)