import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', // 'render here notification...'
  reducers: {
    placeNotification: (state, action) => {
        return action.payload
    },
    clearNotification: (state, action) => {
        return ''
    }
  },})

export const { placeNotification, clearNotification } = notificationSlice.actions

export const setNotification = (input, seconds) => {
  return async dispatch => {
    dispatch(placeNotification(input))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds*1000)
  }
}

export default notificationSlice.reducer