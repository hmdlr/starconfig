import { configureStore } from "@reduxjs/toolkit";

import { brandsSlice } from "./Brands/slice";
import { configurationsSlice } from "./Configurations/slice";

export const store = configureStore({
  reducer: {
    brands: brandsSlice.reducer,
    configurations: configurationsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
