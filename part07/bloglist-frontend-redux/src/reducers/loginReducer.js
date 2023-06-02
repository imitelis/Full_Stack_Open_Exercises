import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'

const initialState = {
  token: '',
  username: '',
  password: ''
}

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    placeLogin: (state, action) => {
        return { token: action.payload.token, username: action.payload.username, password: action.payload.password }
    },
    placeToken: (state, action) => {
      return { ...state, token: action.payload.token }
    },
    clearLogin: (state, action) => {
        return { token: '', username: '', password: '' }
    }
  },})

export const { placeLogin, placeToken, clearLogin } = loginSlice.actions

export const beginSession = (user) => {
    return async dispatch => {
      const loggedUsername = user.username;
      const loggedPassword = user.password;
      await loginService.login({ loggedUsername, loggedPassword })
      dispatch(placeLogin(user))
    }
}

export const setToken = (token) => {
  return async dispatch => {
    dispatch(placeToken(token))
  }
}

export const endSession = () => {
    return async dispatch => {
      dispatch(clearLogin())
    }
}

export default loginSlice.reducer