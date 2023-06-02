import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    color: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    placeSuccessNotification: (state, action) => {
        return { message: action.payload, color: 'green' }
    },
    placeErrorNotification: (state, action) => {
        return { message: action.payload, color: 'red' }
    },
    clearNotification: (state, action) => {
        return { message: '', color: '' }
    }
  },})

export const { placeSuccessNotification, placeErrorNotification, clearNotification } = notificationSlice.actions

let timeoutGreenId

export const setGreenNotification = (input) => {
  return async dispatch => {
    dispatch(placeSuccessNotification(input))

    if (timeoutGreenId) {
        clearTimeout(timeoutGreenId)
    }
    
    setTimeout(() => {
      dispatch(clearNotification())
      timeoutGreenId = null
    }, 5000)
  }
}

let timeoutRedId

export const setRedNotification = (input) => {
    return async dispatch => {
      dispatch(placeErrorNotification(input))
  
      if (timeoutRedId) {
          clearTimeout(timeoutRedId)
      }
      
      setTimeout(() => {
        dispatch(clearNotification())
        timeoutRedId = null
      }, 5000)
    }
}

export default notificationSlice.reducer