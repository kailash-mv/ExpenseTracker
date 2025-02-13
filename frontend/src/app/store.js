import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "../features/budgetSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    budget: budgetReducer,
  },
});
