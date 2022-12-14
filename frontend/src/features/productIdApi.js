import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productIdApi = createApi({
    reducerPath: 'productIdApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (builder) => ({
        getProductById: builder.query({
            query: (id) => `products/${id}`,
        }),
    }),
});

export const { useGetProductByIdQuery } = productIdApi;