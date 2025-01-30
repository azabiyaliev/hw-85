import {IAlbum, IAlbumRes} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axiosAPI.ts";

export const fetchAlbums = createAsyncThunk<IAlbumRes[], string>(
    "albums/fetchAlbums",
    async (artist)=> {
        const response = await axiosAPI.get<IAlbumRes[]>(`/albums?artist=${artist}`);
        return response.data || [];
    });

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
    },
);

export const deleteAlbumById = createAsyncThunk<void, string,  {state: RootState }>(
    "albums/deleteAlbumById",
    async (id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosAPI.delete(`/albums/${id}`, {headers: {'Authorization': token}});
    }
)

export const togglePublishedAlbum = createAsyncThunk<void, string,  {state: RootState }>(
    "albums/togglePublishedAlbum",
    async (id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosAPI.patch(`/albums/${id}/togglePublished`, {headers: {'Authorization': token}});
    }
)