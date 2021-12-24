import { configureStore } from '@reduxjs/toolkit'
import { wishListApi } from '../api/wishList'
import { wishListItemApi } from "../api/wishListItem"

export const store = configureStore({
  reducer: {
    [wishListApi.reducerPath]: wishListApi.reducer,
    [wishListItemApi.reducerPath]: wishListItemApi.reducer

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(wishListApi.middleware, wishListItemApi.middleware)
})
