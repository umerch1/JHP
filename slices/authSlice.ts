import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    token: string | null;
    email: string | null;
    role: "jobseeker" | "employer" | "admin" | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    email: null,
    role: null,
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
        setrole: (state, action: PayloadAction<"jobseeker" | "employer" | "admin" | null>) => {
            state.role = action.payload;
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.email = null;
            state.role = null;
        },
    },
});

export const { setUser, setToken, logout, setemail, setrole } = authSlice.actions;
export default authSlice.reducer;
