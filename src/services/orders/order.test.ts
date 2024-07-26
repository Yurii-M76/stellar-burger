import { expect, describe } from '@jest/globals';
import orderSlice, { TInitialState } from './reducer';
import { orders, orderBurger } from './actions';

describe('Test orderSlice', () => {
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

  const testOrderData = [
    {
      _id: '1',
      status: 'status',
      name: 'name',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      number: 0,
      ingredients: []
    }
  ];

  it('Checking the Orders action', async () => {
    const actionPending = {
      type: orders.pending.type
    };
    const resultPending = orderSlice.reducer(initialState, actionPending);
    const actualPending = {
      ...initialState,
      loading: true
    };
    expect(resultPending).toEqual(actualPending);

    const actionFulfilled = {
      type: orders.fulfilled.type,
      payload: testOrderData
    };
    const resultFulfilled = orderSlice.reducer(initialState, actionFulfilled);
    const actualFulfilled = {
      ...initialState,
      loading: false,
      profileOrders: testOrderData
    };
    expect(resultFulfilled).toEqual(actualFulfilled);

    const actionRejected = {
      type: orders.rejected.type,
      error: new Error('error text')
    };
    const resultRejected = orderSlice.reducer(initialState, actionRejected);
    const actualRejected = {
      ...initialState,
      loading: false,
      error: 'error text'
    };
    expect(resultRejected).toEqual(actualRejected);
  });

  it('Checking the OrderBurger action', async () => {
    const actionPending = {
      type: orderBurger.pending.type
    };
    const resultPending = orderSlice.reducer(initialState, actionPending);
    const actualPending = {
      ...initialState,
      loading: true
    };
    expect(resultPending).toEqual(actualPending);

    const testData = { name: 'name', order: 'order' };
    const actionFulfilled = {
      type: orderBurger.fulfilled.type,
      payload: testData
    };
    const { name, order } = orderSlice.reducer(initialState, actionFulfilled);
    const resultFulfilled = {
      name: name,
      order: order
    };
    const actualFulfilled = testData;
    expect(resultFulfilled).toEqual(actualFulfilled);

    const actionRejected = {
      type: orderBurger.rejected.type,
      error: new Error('error text')
    };
    const resultRejected = orderSlice.reducer(initialState, actionRejected);
    const actualRejected = {
      ...initialState,
      loading: false,
      error: 'error text'
    };
    expect(resultRejected).toEqual(actualRejected);
  });
});
