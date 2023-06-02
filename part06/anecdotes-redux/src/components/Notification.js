import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    if ( state.notification === '' ) {
      return ''
    } else if ( state.notification !== '' ) {
      return [...state.notification]
    }
  })

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

export default Notification
