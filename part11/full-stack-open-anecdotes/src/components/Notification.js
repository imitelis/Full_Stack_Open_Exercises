import { connect } from 'react-redux'

const Notification = (props) => {

  const notification = props.notification

  if (notification === '') {
    return (
      <div>
      </div>
    )
  } else {
    return (
      <div className="notification">
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
