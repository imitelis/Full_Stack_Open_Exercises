const NotificationBlue = ({ message }) => {
  if (message === null || message === '') {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const NotificationRed = ({ message }) => {
  if (message === null || message === '') {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export {NotificationBlue, NotificationRed}
