const NotificationGreen = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='success'>
        {message}
      </div>
    )
  }

const NotificationRed = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='warning'>
        {message}
      </div>
    )
  }
  
export {NotificationGreen, NotificationRed}