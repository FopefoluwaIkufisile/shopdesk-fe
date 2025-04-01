import { api } from "@/redux/api";

interface UpdateImageRequest {
  organization_id: string;
  formData: FormData;
}

interface ImageResponse {
  message: string;
  [key: string]: any;
}

export const imageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET Image
    getOrganizationImage: builder.query<
      ImageResponse,
      { organization_id: string }
    >({
      query: ({ organization_id }) => ({
        url: `organizationImage`,
        method: "GET",
        params: {organization_id}
      }),
      providesTags: ["OrganizationImage"],
      keepUnusedDataFor: 3600,
    }),

    // PATCH Image
    updateOrganizationImage: builder.mutation<
      ImageResponse,
      UpdateImageRequest
    >({
      query: ({ organization_id, formData }) => ({
        url: `organizationImage`,
        method: "PATCH",
        body: formData,
        params: { organization_id },
      }),
      invalidatesTags: ["OrganizationImage"],
    }),
  }),
});

export const {
  useGetOrganizationImageQuery,
  useUpdateOrganizationImageMutation,
} = imageApi;
