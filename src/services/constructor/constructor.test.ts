import { describe } from '@jest/globals';
import constructorSlice, {
  addIngredient,
  sortIngredient,
  removeIngredients,
  clearIngredients
} from './reducer';

describe('Test constructorSlice', () => {
  it('Test add ingredient', async () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const testData = {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const result = constructorSlice.reducer(
      initialState,
      addIngredient(testData)
    );

    expect({
      _id: result.bun?._id,
      name: result.bun?.name,
      type: result.bun?.type,
      proteins: result.bun?.proteins,
      fat: result.bun?.fat,
      carbohydrates: result.bun?.carbohydrates,
      calories: result.bun?.calories,
      price: result.bun?.price,
      image: result.bun?.image,
      image_mobile: result.bun?.image_mobile,
      image_large: result.bun?.image_large
    }).toEqual(testData);
  });

  it('Test remove ingredient', async () => {
    const testRemoveData = {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '123'
    };

    const initialState = {
      bun: null,
      ingredients: [testRemoveData]
    };

    const result = constructorSlice.reducer(
      initialState,
      removeIngredients('123')
    );

    const actualData = {
      ...initialState,
      ingredients: []
    };

    expect(result).toEqual(actualData);
  });

  it('Test moving ingredient', async () => {
    const testSortData = [
      {
        _id: '1',
        name: 'Булка 1',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '1'
      },
      {
        _id: '2',
        name: 'Булка 2',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '2'
      }
    ];

    const initialState = {
      bun: null,
      ingredients: testSortData
    };

    const result = constructorSlice.reducer(
      initialState,
      sortIngredient({ index: 0, position: +1 })
    );
    expect(result.ingredients[0]).toEqual(testSortData[1]);
    expect(result.ingredients[1]).toEqual(testSortData[0]);
  });

  it('Test clear ingredients', async () => {
    const testClearData = [
      {
        _id: '1',
        name: 'Булка 1',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '1'
      },
      {
        _id: '2',
        name: 'Булка 2',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '2'
      }
    ];

    const initialState = {
      bun: null,
      ingredients: testClearData
    };
    const result = constructorSlice.reducer(initialState, clearIngredients());
    expect(result).toEqual({ bun: null, ingredients: [] });
  });
});
