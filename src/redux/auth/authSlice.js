import { createSlice } from '@reduxjs/toolkit';
import {
  signupThunk,
  loginThunk,
  getCurrentUserThunk,
  logoutThunk,
} from './authThunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: '', email: '' },
    token: '',
    error: 'null',
    isLoading: false,
    isAuth: false,
  },
  // reducers: {
  // },
  extraReducers: {
    [signupThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    [signupThunk.fulfilled](state, action) {
      state.auth.user = action.payload.user;
      state.auth.token = action.payload.token;
      state.auth.isLoading = false;
      state.auth.isAuth = true;

      // return {
      //   ...state,
      //   user: action.payload.user,
      //   token: action.payload.token,
      //   isLoading: false,
      //   isAuth: true,
      // };
    },
    [signupThunk.rejected](state, action) {
      //   console.log(action);
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    [loginThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
        error: null,
        // !!!!!!!!!!!!!!!!!!!!!!!!!// isAuth: false,
      };
    },
    [loginThunk.fulfilled](state, action) {
      // if (action.payload.name)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuth: true,
      };
    },
    [loginThunk.rejected](state, action) {
      //   console.log(action);
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    [getCurrentUserThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
        error: null,
        // !!!!!!!!!!!!!!!!!!!!!!!!!// isAuth: false,
      };
    },
    [getCurrentUserThunk.fulfilled](state, action) {
      console.log('action: ', action);
      if (action.payload.message) {
        return {
          ...state,
          isLoading: false,
          isAuth: false,
          error: action.payload,
        };
      }
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuth: true,
      };
    },
    [getCurrentUserThunk.rejected](state, action) {
      //   console.log(action);
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        error: action.payload,
      };
    },
    [logoutThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
        error: null,
        // !!!!!!!!!!!!!!!!!!!!!!!!!// isAuth: false,
      };
    },
    [logoutThunk.fulfilled](state, action) {
      console.log('action: ', action);
      // if (action.payload.message) {
      //   return {
      //     ...state,
      //     isLoading: false,
      //     isAuth: false,
      //     error: action.payload,
      //   };
      // }
      return {
        user: { name: '', email: '' },
        token: '',
        error: 'null',
        isLoading: false,
        isAuth: false,
      };
    },
    [logoutThunk.rejected](state, action) {
      //   console.log(action);
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        error: action.payload,
      };
    },
  },
});

export const { renameProp } = authSlice.actions;
export default authSlice.reducer;
