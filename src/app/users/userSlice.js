import { apiSlice } from "../api/apiSlice";

const initialState = [];

export const usersSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => "/users",
            transformResponse: response => {
                return response.data;
            },
            providesTags: ["Users"]
        }),

        addUser: builder.mutation({
            query: (user) => ({
                url: `/users?email=${user.email}`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['Users']

        }),

        updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PUT",
                body: user,
                transformResponse: response => {
                    return response;
                }
            }),
            invalidatesTags: ['Users']

        }),

        deleteUser: builder.mutation({

            query: (user) => ({
                url: "/users",
                method: "DELETE",
                body: user,
                transformResponse: response => {
                    return response;
                }
            }),

            invalidatesTags: ['Users']

        })
    })
})



export const {

    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation

} = usersSlice;