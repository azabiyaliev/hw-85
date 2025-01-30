import {IAlbum} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axiosAPI.ts";

export const postAlbum = createAsyncThunk<void, IAlbum, { state: RootState }>(
    "albums/postAlbum",
    async (IAlbum, { getState }) => {

        const token = getState().users.user?.token;

        const formData = new FormData();

        const keys = Object.keys(IAlbum) as (keyof IAlbum)[];

        keys.forEach((key) => {
            const value = IAlbum[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post("/albums", formData, {
            headers: {'Authorization': token},
        });
        console.log(token);
    },
);