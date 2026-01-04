import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApi = createApi({
    reducerPath: "jobsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.43.167:5000",
        // prepareHeaders: (headers, { getState }) => {
        //     headers.set("Content-Type", "application/json");
        //     const token = (getState() as any).auth?.token;
        //     if (token) headers.set("Authorization", `Bearer ${token}`);
        //     return headers;
        // },
          prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Jobs"],
    endpoints: (builder) => ({
        fetchJobs: builder.query<any[], void>({
            query: () => "/api/jobs",
            providesTags: ["Jobs"],
        }),
        applyJob: builder.mutation<any, { jobId: string; userId: string }>({
            query: ({ jobId, userId }) => ({
                url: `/api/jobs/${jobId}/apply/${userId}`,
                method: "POST",
                body: {},
            }),
            invalidatesTags: ["Jobs"],
        }),
    }),
});

export const { useFetchJobsQuery, useApplyJobMutation } = jobsApi;
