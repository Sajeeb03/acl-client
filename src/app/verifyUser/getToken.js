import { apiSlice } from "../api/apiSlice";


export const getToken = apiSlice.injectEndpoints({
    endpoints: builder => ({
        setJwtToken: builder.mutation({
            query: (email) => ({
                url: `/jwt?email=${email}`,
                method: "POST",
                transformResponse: response => {
                    return response.data;
                }
            })
        })
    })
});


export const { useSetJwtTokenMutation } = getToken;