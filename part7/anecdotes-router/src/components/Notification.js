const Notification = ({notification}) => {
    const style = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
  
    if (notification === '') {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <div style={style}>
          {notification}
        </div>
      )
    }
  }

export default Notification;