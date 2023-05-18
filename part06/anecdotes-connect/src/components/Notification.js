import { connect } from 'react-redux'

const Notification = (props) => {

  const notification = props.notification  

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

const mapStateToProps = (state) => {
  if ( state.notification === '' ) {
    return {
      notification: ''
    }
  } else if ( state.notification !== '' ) {
    return {
      notification: [...state.notification]
    }
  }
}

export default connect(
  mapStateToProps,
  null)
  (Notification)
