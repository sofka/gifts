import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../const'
import { CWishListItem } from '../../types'

export type TResult = {
  code: string
  sqlState: string
}

export const wishListItemApi = createApi({
  reducerPath: 'wishListItemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: builder => ({
    getById: builder.mutation<CWishListItem, string>({
      query: id => `/wishlistitem/${id}`
    }),
    getByWishListId: builder.mutation<CWishListItem[], string>({
      query: id => `/wishListItemByWishListId/${id}`
    }),
    saveWishList: builder.mutation<TResult, CWishListItem>({
      query: wishlistItem => ({
        url: `/wishlistitem`,
        method: 'POST',
        body: wishlistItem
      })
    }),
    updateWishList: builder.mutation<TResult, CWishListItem>({
      query: wishlistItem => ({
        url: `/wishlistitem`,
        method: 'PUT',
        body: wishlistItem
      })
    })
  })
})

export const {
  useGetByWishListIdMutation,
  useGetByIdMutation,
  useSaveWishListMutation,
  useUpdateWishListMutation
} = wishListItemApi
