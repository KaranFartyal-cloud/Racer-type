import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice.ts";

const store = configureStore({
  reducer: {
    game: gameSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>; // Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch; // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
