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
    createWishListItem: builder.mutation<TResult, CWishListItem>({
      query: wishListItem => ({
        url: `wishListItem`,
        method: 'POST',
        body: JSON.parse(JSON.stringify(wishListItem))
      })
    }),
    updateWishListItem: builder.mutation<TResult, CWishListItem>({
      query: wishListItem => ({
        url: `wishListItem`,
        method: 'PUT',
        body: JSON.parse(JSON.stringify(wishListItem))
      })
    }),
    delete: builder.mutation<TResult, string>({
      query: id => ({
        url: `/wishlistitem/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetByWishListIdMutation,
  useGetByIdMutation,
  useCreateWishListItemMutation,
  useUpdateWishListItemMutation,
  useDeleteMutation
} = wishListItemApi
