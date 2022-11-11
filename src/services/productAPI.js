import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://front-test-api.herokuapp.com/api/",
  }),
  keepUnusedDataFor: 3600, // it's delete unused data when past an hour
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "product",
    }),
    getProductById: builder.query({
      query: (productId) => `product/${productId}`,
    }),
    addProductToCart: builder.mutation({
      query: (product) => ({
        url: "/cart",
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductToCartMutation,
} = productAPI;
