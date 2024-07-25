import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredients: TIngredient) => ({
        payload: { ...ingredients, id: nanoid() }
      })
    },
    removeIngredients: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    sortIngredient(state, action) {
      const { index, position } = action.payload;
      const payloadIndex = index + position;

      if (payloadIndex >= 0 && payloadIndex < state.ingredients.length) {
        const ingredientsIndex = state.ingredients[index];
        state.ingredients[index] = state.ingredients[payloadIndex];
        state.ingredients[payloadIndex] = ingredientsIndex;
      }
    },
    clearIngredients: (state) => (state = initialState)
  },
  selectors: {
    getConstructorItems: (state) => state,
    getConstructorIngredients: (state) => state.ingredients
  }
});

export const { getConstructorItems, getConstructorIngredients } =
  constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredients,
  sortIngredient,
  clearIngredients
} = constructorSlice.actions;

export default constructorSlice;
