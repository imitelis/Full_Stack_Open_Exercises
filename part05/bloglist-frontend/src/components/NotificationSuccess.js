import { useState, useEffect } from 'react'

const NotificationSuccess = ({ notificationMessage }) => {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    setMessage(notificationMessage)
  }, [notificationMessage])

  setTimeout(() => {
    setMessage(null)
  }, 5000)

  if (message === null || notificationMessage === null) {
    return null
  } else return (
    <>
      <div className='success'>
        {message}
      </div>
    </>
  )
}

export default NotificationSuccess