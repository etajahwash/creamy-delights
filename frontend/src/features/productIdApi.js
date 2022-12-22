import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './api';

export const productIdApi = createApi({
    reducerPath: 'productIdApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        getProductById: builder.query({
            query: (id) => `products/${id}`,
        }),
    }),
});

export const { useGetProductByIdQuery } = productIdApi;