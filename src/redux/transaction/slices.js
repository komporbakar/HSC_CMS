import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    loading: false,
    data: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    currentItems: 1
  },
  reducers: {
    startFetchingTransaction: (state) => {
      state.loading = true;
    },
    fetchTransactionSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.currentPage = action.payload.currentPage
      state.totalPages = action.payload.totalPages
      state.totalItems = action.payload.totalItems
      state.currentItems = action.payload.currentItems
    //   state.error = null;
    },
    fetchTransactionFailure: (state, action) => {
      state.loading = false;
      state.data = [];
    //   state.error = action.payload;
    },
  },
});

export const { startFetchingTransaction, fetchTransactionSuccess, fetchTransactionFailure } = transactionSlice.actions;

export default transactionSlice.reducer;
