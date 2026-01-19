
//@ts-ignore
import { BASE_URL } from "@/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<any, {
            firstName: string;
            lastName?: string;
            mobile: string;
            email: string;
            pin: string;
            address: string;
            city: string;
            role: string;
            cv?: string;
        }>({
            query: (userData) => ({
                url: "/api/auth/register",
                method: "POST",
                body: userData,
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = authApi;
