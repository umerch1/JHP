
import { BASE_URL } from "@/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["User", "Admin"],
    endpoints: (builder) => ({
        // ✅ Approve User
        approveUser: builder.mutation({
            query: (id: string) => ({
                url: `/api/admin/approve/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Admin", "User"],
        }),
        userLogin: builder.mutation<{ message: string; user: any }, { email: string; pin: string }>({
            query: (credentials) => ({
                url: "/api/user/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["User", "Admin"],
    }),
        // ✅ Fetch All Users (optional, to list users)
        fetchUsers: builder.query({
            query: () => "/api/user/pending",
            providesTags: ["User", "Admin"],
        }),
    }),
});

export const { useApproveUserMutation, useUserLoginMutation, useFetchUsersQuery } = userApi;
