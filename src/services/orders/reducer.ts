import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { feeds, orderBurger, orderByNumber, orders } from './actions';

export type TInitialState = {
  order: TOrder | null;
  feeds: TOrder[];
  name: string | null;
  loading: boolean;
  orderModalData: TOrder[];
  profileOrders: TOrder[];
  total: number | null;
  totalToday: number | null;
  error: string | undefined;
};

const initialState: TInitialState = {
  order: null,
  feeds: [],
  name: null,
  loading: false,
  orderModalData: [],
  profileOrders: [],
  total: null,
  totalToday: null,
  error: ''
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.name = null;
    }
  },
  selectors: {
    getLoading: (state) => state.loading,
    getOrder: (state) => state.order,
    getFeeds: (state) => state.feeds,
    getOrderModalData: (state) => state.orderModalData,
    getProfileOrders: (state) => state.profileOrders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(feeds.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(feeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(feeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.feeds = [];
        state.total = 0;
        state.totalToday = 0;
      })

      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.order = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(orders.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(orders.fulfilled, (state, action) => {
        state.loading = false;
        state.profileOrders = action.payload;
      })
      .addCase(orders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(orderByNumber.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(orderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.orders;
      })
      .addCase(orderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getLoading,
  getOrder,
  getFeeds,
  getOrderModalData,
  getProfileOrders,
  getTotal,
  getTotalToday
} = orderSlice.selectors;
export default orderSlice;

export const { resetOrder } = orderSlice.actions;
