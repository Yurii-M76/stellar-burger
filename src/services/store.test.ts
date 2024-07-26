import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';

describe('Test rootReducer', () => {
  it('Test correct initializes state', async () => {
    const store = configureStore({ reducer: rootReducer });
    const action = { type: '@@INIT' };
    const state = rootReducer(undefined, action);
    expect(state).toEqual(store.getState());
  });
});
