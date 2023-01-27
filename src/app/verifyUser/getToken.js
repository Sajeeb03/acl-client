import { apiSlice } from "../api/apiSlice";


export const getToken = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getJwtToken: builder.query({
            query: (email) => `/jwt?email=${email}`,
            transformResponse: response => {
                return response.data;
            }
        })
    })
});


export const { useGetJwtTokenQuery } = getToken;