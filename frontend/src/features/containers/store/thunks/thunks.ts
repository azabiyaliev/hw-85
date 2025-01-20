import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    IAlbumRes,
    IArtistRes,
    ITrackRes,
    IRegister,
    IRegisterResponse,
    ValidationError,
    ILogin, IUser, GlobalError
} from "../../../../types";
import axiosAPI from "../../../../axiosAPI.ts";
import {isAxiosError} from "axios";


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

export const register = createAsyncThunk<
    IRegisterResponse,
    IRegister,
    {rejectValue: ValidationError}
>(
    'users/register',
    async (register: IRegister, {rejectWithValue}) => {
        try {
            const response = await axiosAPI.post<IRegisterResponse>('/users/register', register);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }
    }
)


export const login = createAsyncThunk<IUser, ILogin, {rejectValue: GlobalError}>(
    'users/login',
    async (login, {rejectWithValue}) => {
        try {
            const response = await axiosAPI.post<IRegisterResponse>('/users/sessions', login);
            return response.data.user;

        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data as GlobalError);
            }

            throw error;
        }
    }
)