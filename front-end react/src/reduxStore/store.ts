import { configureStore } from "@reduxjs/toolkit";
import giftSlice from "./slices/adminGiftsSlice";

const store = configureStore({
    reducer: {
        gifts: giftSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
