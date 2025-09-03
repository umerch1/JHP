import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    token: string | null;
    email: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    email: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setemail: (state, action: PayloadAction<string | null>) => {
            state.email = action.payload;
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, setToken, logout, setemail } = authSlice.actions;
export default authSlice.reducer;
