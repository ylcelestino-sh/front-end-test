import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://front-test-api.herokuapp.com/api/",
  }),
  tagTypes: ['Product'],
  keepUnusedDataFor: 3600, // it's delete unused data when past an hour
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "product",
      providesTags: ['Product']
    }),
    getProductById: builder.query({
      query: (productId) => `product/${productId}`,
      providesTags: ['Product']
    }),
    addProductToCart: builder.mutation({
      query: (product) => ({
        url: "/cart",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ['Product']
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductToCartMutation,
} = productAPI;
