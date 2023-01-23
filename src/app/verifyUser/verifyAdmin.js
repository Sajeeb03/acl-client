import { apiSlice } from "../api/apiSlice";

const initialState = [];

export const verifyAdminSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdmin: builder.query({
            query: (email) => `/users?email=${email}`,
            transformResponse: response => {
                console.log(response)
                return response;
            }
        })
    })
});


export const { useGetAdminQuery } = verifyAdminSlice;