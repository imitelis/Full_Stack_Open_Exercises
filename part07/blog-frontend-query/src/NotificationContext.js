import { createContext, useReducer, useContext } from 'react'

const initialState = {
    message: '',
    color: ''
}

const notificationReducer = (state = initialState, action) => {
    // console.log('action', action.type)
    switch (action.type) {
      case "GREEN_NOTIFICATION":
        return { message: action.payload, color: 'green' }
      case "RED_NOTIFICATION":
        return { message: action.payload, color: 'red' }
      case "CLEAR_NOTIFICATION":
        return { message: '', color: '' }
      default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatchValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext