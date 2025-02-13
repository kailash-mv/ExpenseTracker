import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    totalBudget: 5000,
    totalSpent: 0,
    safeToSpend: 5000 / 30,
  },
  reducers: {
    addExpense: (state, action) => {
      const { amount } = action.payload;
      state.totalSpent += amount;
      state.safeToSpend = ((state.totalBudget - state.totalSpent) / 30).toFixed(
        2
      );
    },
    removeExpense: (state, action) => {
      const { amount } = action.payload;
      state.totalSpent -= amount;
      if (state.totalSpent < 0) state.totalSpent = 0;
      state.safeToSpend = ((state.totalBudget - state.totalSpent) / 30).toFixed(
        2
      );
    },

    updateBudgetData: (state, action) => {
      const { totalBudget, totalSpent, safeToSpend } = action.payload;
      state.totalBudget = totalBudget;
      state.totalSpent = totalSpent;
      if (state.totalSpent < 0) state.totalSpent = 0;
      state.safeToSpend = safeToSpend;
    },
  },
});

export const { addExpense, removeExpense, updateBudgetData } =
  budgetSlice.actions;
export const selectBudget = (state) => state.budget;
export default budgetSlice.reducer;
