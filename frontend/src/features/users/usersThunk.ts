import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, ILogin, IRegister, IRegisterResponse, IUser, ValidationError} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store.ts";

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