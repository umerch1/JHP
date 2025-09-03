import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.10.4:5000",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<any, {
            firstName: string;
            mobile: string;
            email: string;
            pin: string;
            address: string;
            city: string;
            role: string;
        }>({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = authApi;
