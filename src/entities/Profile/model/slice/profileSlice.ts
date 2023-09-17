import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: null,
    data: null,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<Profile>) => {

        },
        initAuthData: (state) => {

        },
        logout: (state) => {

        },
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
