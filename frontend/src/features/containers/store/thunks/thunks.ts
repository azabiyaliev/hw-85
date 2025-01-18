import {createAsyncThunk} from "@reduxjs/toolkit";
import {IArtistRes} from "../../../../types";
import axiosAPI from "../../../../axiosAPI.ts";


export const fetchArtists = createAsyncThunk<IArtistRes[], void>(
    "artists/fetchArtists",
    async ()=> {
        const response = await axiosAPI.get<IArtistRes[]>("/artists");
        return response.data || [];
    });