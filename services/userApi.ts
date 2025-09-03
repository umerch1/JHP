import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.10.4:5000/", // 🔗 backend base URL
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
                url: `admin/approve/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Admin", "User"],
        }),
        userLogin: builder.mutation<{ message: string; user_id: string }, { email: string; pin: string }>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["User", "Admin"],
        }),
        // ✅ Fetch All Users (optional, to list users)
        fetchUsers: builder.query({
            query: () => "users/pending",
            providesTags: ["User", "Admin"],
        }),
    }),
});

export const { useApproveUserMutation, useUserLoginMutation, useFetchUsersQuery } = userApi;
