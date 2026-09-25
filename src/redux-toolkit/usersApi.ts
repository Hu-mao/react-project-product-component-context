import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../interfaces/IUser";

export const usersApi = createApi({
    reducerPath: "usersApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
    }),

    tagTypes: ["Users"],

    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => "users",
            providesTags: ["Users"],
        }),

        addUser: builder.mutation<IUser, Omit<IUser, "id">>({
            query: (user) => ({
                url: "users",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddUserMutation,
} = usersApi;