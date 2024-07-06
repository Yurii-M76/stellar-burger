import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, register, userData, userUpdate } from './actions';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error?: string | null;
};

const initialState: TInitialState = {
  user: null,
  isAuthChecked: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Авторизация
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = false;
      })

      // Выход
      .addCase(logout.pending, (state) => {
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        state.isAuthChecked = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      })

      // Данные юзера
      .addCase(userData.pending, (state) => {
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(userData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      })

      // Обновление данных юзера
      .addCase(userUpdate.pending, (state) => {
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      });
  }
});

export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setUser, setIsAuthChecked } = userSlice.actions;
export default userSlice;
