import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const feeds = createAsyncThunk(
  'feeds/fetch',
  async () => await getFeedsApi()
);

export const orders = createAsyncThunk(
  'orders/fetch',
  async () => await getOrdersApi()
);

export const orderBurger = createAsyncThunk(
  'orderBurger/fetch',
  async (data: string[]) => await orderBurgerApi(data)
);

export const orderByNumber = createAsyncThunk(
  'orderByNumber/fetch',
  async (number: number) => await getOrderByNumberApi(number)
);
