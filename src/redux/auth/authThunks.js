import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_USER_URL = 'https://connections-api.herokuapp.com/';
const userSignup = 'users/signup';
const userLogin = 'users/login';
const userLogout = 'users/logout';
const userCurrent = 'users/current';

// async function FetchWithErrorHandling(url = '') {
//   const response = await fetch(url);
//   return response.ok
//     ? await response.json()
//     : Promise.reject(new Error('Not found'));
// }

// export function fetchTrendMovies() {
//   return FetchWithErrorHandling(`${BASE_URL}trending/movie/day?${API_KEY}`);
// }

export const signupThunk = createAsyncThunk(
  'users/signup',
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_USER_URL + userSignup, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue({ error: err.name });
    }
  },
);

export const loginThunk = createAsyncThunk(
  'users/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_USER_URL + userLogin, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue({ error: err.name });
    }
  },
);

export const getCurrentUserThunk = createAsyncThunk(
  'users/current',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    // const token = state.auth.token;
    // if (!token) return;
    // console.log('state: ', state.auth.token);
    try {
      const response = await fetch(BASE_USER_URL + userCurrent, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          // Authorization: `Bearer ${state.auth.token}`,
          Authorization: `${state.auth.token}`,
        },
      });
      const data = await response.json();
      console.log('response in currentThunk: ', response);
      console.log('data in currentThunk: ', data);

      return data;
    } catch (err) {
      console.log('err: ', err);
      return rejectWithValue(err.message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'users/logout',
  // async (_, { rejectWithValue }) => {
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    // const token = state.auth.token;
    // if (!token) return;
    // console.log('state: ', state.auth.token);
    try {
      const response = await fetch(BASE_USER_URL + userLogout, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          // Authorization: `Bearer ${state.auth.token}`,
          Authorization: `${state.auth.token}`,
        },
      });
      const data = await response.json();
      console.log('response in logoutThunk: ', response);
      console.log('data in logoutThunk: ', data);

      return data;
    } catch (err) {
      console.log('err: ', err);
      return rejectWithValue(err.message);
    }
  },
);
