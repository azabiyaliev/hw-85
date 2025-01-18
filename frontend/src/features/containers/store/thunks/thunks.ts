import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAlbumRes, IArtistRes, ITrackRes} from "../../../../types";
import axiosAPI from "../../../../axiosAPI.ts";


export const fetchArtists = createAsyncThunk<IArtistRes[], void>(
    "artists/fetchArtists",
    async ()=> {
        const response = await axiosAPI.get<IArtistRes[]>("/artists");
        return response.data || [];
    });

export const fetchAlbums = createAsyncThunk<IAlbumRes[], string>(
    "albums/fetchAlbums",
    async (artist)=> {
        const response = await axiosAPI.get<IAlbumRes[]>(`/albums?artist=${artist}`);
        return response.data || [];
    });

export const fetchTracks = createAsyncThunk<ITrackRes[], string>(
    "tracks/fetchTracks",
    async (album)=> {
        const response = await axiosAPI.get<ITrackRes[]>(`/tracks?album=${album}`);
        return response.data || [];
    });