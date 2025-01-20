import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    IAlbumRes,
    IArtistRes,
    ITrackRes,
    IRegister,
    IRegisterResponse,
    ValidationError,
    ILogin, IUser, GlobalError, ITrackHistory, ITrackHistoryRes
} from "../../../../types";
import axiosAPI from "../../../../axiosAPI.ts";
import {isAxiosError} from "axios";
import {RootState} from "../../../../app/store.ts";


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

export const logout = createAsyncThunk<void, void, {state: RootState}>(
    'users/logout',
    async (_, {getState}) => {
      const token = getState().users.user?.token;
      await axiosAPI.delete("/users/sessions", {headers: {'Authorization': token}});
    }
)

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