import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const backendAPI = process.env.REACT_APP_API_URL;

export const productIdApi = createApi({
    reducerPath: 'productIdApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${backendAPI}` }),
    endpoints: (builder) => ({
        getProductById: builder.query({
            query: (id) => `products/${id}`,
        }),
    }),
});

export const { useGetProductByIdQuery } = productIdApi;
