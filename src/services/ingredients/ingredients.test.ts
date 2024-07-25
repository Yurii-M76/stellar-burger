import { expect, describe } from '@jest/globals';
import { getIngredients } from './actions';
import { ingredientsSlice, TIngredientsState } from './reducer';

describe('Test ingredientsSlice', () => {
  const initialState: TIngredientsState = {
    loading: false,
    ingredients: [],
    error: null
  };

  it('Test getIngredients action', async () => {
    const testIngredient = [
      {
        _id: '1',
        name: 'Ингредиент 1',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];

    const actionPending = {
      type: getIngredients.pending.type
    };
    const resultPending = ingredientsSlice.reducer(initialState, actionPending);
    const actualPending = {
      ...initialState,
      loading: true
    };
    expect(resultPending).toEqual(actualPending);

    const actionFulfilled = {
      type: getIngredients.fulfilled.type,
      payload: testIngredient
    };
    const resultFulfilled = ingredientsSlice.reducer(
      initialState,
      actionFulfilled
    );
    const actualFulfilled = {
      ...initialState,
      loading: false,
      ingredients: testIngredient,
      error: null
    };
    expect(resultFulfilled).toEqual(actualFulfilled);

    const actionRejected = {
      type: getIngredients.rejected.type,
      error: new Error('error text')
    };
    const resultRejected = ingredientsSlice.reducer(
      initialState,
      actionRejected
    );
    const actualRejected = {
      ...initialState,
      loading: false,
      error: 'error text'
    };
    expect(resultRejected).toEqual(actualRejected);
  });
});
