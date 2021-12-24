import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from "../../const"
import { TWishList } from "../../types"

export type TResult ={
  code: string,
  sqlState:string
}

export const wishListApi = createApi({
  reducerPath: 'wishListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: builder => ({
    getWishListById: builder.mutation<TWishList, string>({
      query: id => `/wishlist/${id}`
    }),
    saveWishList: builder.mutation<TResult, TWishList>({
      query: wishlist => ({
        url: `/wishlist`,
        method: 'POST',
        body: wishlist
      })
    }),
    updateWishList: builder.mutation<TResult, TWishList>({
      query: wishlist => ({
        url: `/wishlist`,
        method: 'PUT',
        body: wishlist
      })
    }),
  })
})

export const { useGetWishListByIdMutation, useSaveWishListMutation, useUpdateWishListMutation } = wishListApi
