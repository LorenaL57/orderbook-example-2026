import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";

const store = configureStore({
    reducer: {
        book: bookReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch