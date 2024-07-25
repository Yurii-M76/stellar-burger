import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const getIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => await getIngredientsApi()
);
