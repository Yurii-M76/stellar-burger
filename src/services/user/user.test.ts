import { describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store';
import { login, userData } from './actions';

const testUser = {
  email: 'test@mail.ru',
  name: 'user'
};

jest.mock('../../utils/burger-api', () => ({
  loginUserApi: jest.fn(() =>
    Promise.resolve({
      user: testUser,
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    })
  ),
  getUserApi: jest.fn(() =>
    Promise.resolve({
      user: testUser
    })
  )
}));

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn()
}));

global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn()
};

describe('Test userSlice', () => {
  it('Test login action', async () => {
    const store = configureStore({
      reducer: { user: rootReducer }
    });
    await store.dispatch(
      login({
        email: testUser.email,
        password: '12345'
      })
    );

    const state = store.getState().user;
    const result = state.user.user;
    expect(result).toEqual(testUser);
    expect(state.user.isAuthChecked).toBe(true);
  });

  it('Test userData action', async () => {
    const store = configureStore({
      reducer: { user: rootReducer }
    });
    await store.dispatch(userData());

    const state = store.getState().user;
    const result = state.user.user;
    expect(result).toEqual(testUser);
    expect(state.user.isAuthChecked).toBe(true);
  });
});
