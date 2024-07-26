import { describe } from '@jest/globals';
import constructorSlice, {
  addIngredient,
  sortIngredient,
  removeIngredients,
  clearIngredients
} from './reducer';

describe('Test constructorSlice', () => {
  describe('Buns test in the constructor', () => {
    it('should add buns when the "Добавить" button is pressed', async () => {
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

    it('should remove buns when clearing the constructor', async () => {
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
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

  describe('Ingredients test in the constructor', () => {
    it('should add ingredients when the "Добавить" button is pressed', async () => {
      const initialState = {
        bun: null,
        ingredients: []
      };

      const testIngredientData = {
        _id: '1',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      };

      const result = constructorSlice.reducer(
        initialState,
        addIngredient(testIngredientData)
      );

      const { id: removedProperty, ...resultRemoveId } = result.ingredients[0];

      expect(resultRemoveId).toEqual(testIngredientData);
    });

    it('should remove ingredients when the "delete" button is pressed', async () => {
      const testRemoveIngredientData = {
        _id: '1',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '123'
      };

      const initialState = {
        bun: null,
        ingredients: [testRemoveIngredientData]
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

    it('should sort ingredients when the "up" or "down" button is pressed', async () => {
      const testSortIngredientData = [
        {
          _id: '1',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: '1'
        },
        {
          _id: '2',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          id: '2'
        }
      ];

      const initialState = {
        bun: null,
        ingredients: testSortIngredientData
      };

      const result = constructorSlice.reducer(
        initialState,
        sortIngredient({ index: 0, position: +1 })
      );
      expect(result.ingredients[0]).toEqual(testSortIngredientData[1]);
      expect(result.ingredients[1]).toEqual(testSortIngredientData[0]);
    });

    it('should remove ingredients when clearing the constructor', async () => {
      const testClearIngredientData = [
        {
          _id: '1',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: '1'
        },
        {
          _id: '2',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          id: '2'
        }
      ];

      const initialState = {
        bun: null,
        ingredients: testClearIngredientData
      };
      const result = constructorSlice.reducer(initialState, clearIngredients());
      expect(result).toEqual({ bun: null, ingredients: [] });
    });
  });
});
