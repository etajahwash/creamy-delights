import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const backendProductsAPI = process.env.REACT_APP_API_URL;

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: backendProductsAPI}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "products",
        }),
    }),
});

export const { useGetAllProductsQuery } = productsApi;
