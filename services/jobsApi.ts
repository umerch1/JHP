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
                // Safely handle non-JSON responses (e.g. HTML error pages) to avoid JSON parse errors
                responseHandler: async (response) => {
                    const text = await response.text();
                    try {
                        return JSON.parse(text);
                    } catch {
                        return text;
                    }
                },
    }),
    tagTypes: ["Jobs"],
    endpoints: (builder) => ({
        fetchJobs: builder.query<any[], void>({
            query: () => "/api/jobs",
            providesTags: ["Jobs"],
        }),
        fetchApplicants: builder.query<{ employerId: string; totalApplicants: number; applicants: any[] }, string>({
            query: (employerId) => ({
                url: `/api/jobs/employer/${employerId}/applicants`,
                method: "GET",
            }),
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
        createJob: builder.mutation<any, { title: string; description: string; location?: string; salary?: string; employmentType?: string; employerId?: string }>({
            query: (jobData) => ({
                url: `/api/jobs/${jobData.employerId}`,
                method: "POST",
                body: jobData,
            }),
            invalidatesTags: ["Jobs"],
        }),
    }),
});

export const { useFetchJobsQuery, useFetchApplicantsQuery, useApplyJobMutation, useCreateJobMutation } = jobsApi;
