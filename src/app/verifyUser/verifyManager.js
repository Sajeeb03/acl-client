import { apiSlice } from "../api/apiSlice";

const initialState = [];

export const verifyManagerSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getManager: builder.query({
            query: (email) => `/users/${email}`,
            transformResponse: response => {
                console.log(response)
                return response;
            }
        })
    })
});


export const { useGetManagerQuery } = verifyManagerSlice;