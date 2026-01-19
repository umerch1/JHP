
import { BASE_URL } from "@/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // Do NOT set Content-Type here so multipart boundary is preserved
  }),
  endpoints: (builder) => ({
    uploadCv: builder.mutation<any, any>({
      query: (file) => {
        const form = new FormData();
        // file should be an object with { uri, name, type } from DocumentPicker
        // @ts-ignore
        form.append("cv", file);
        return {
          url: "/api/upload/upload-cv",
          method: "POST",
          body: form,
        };
      },
    }),
  }),
});

export const { useUploadCvMutation } = uploadApi;
