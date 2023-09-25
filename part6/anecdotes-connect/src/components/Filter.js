import { connect } from 'react-redux'

import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  
  const handleChange = (event) => {
    props.filterChange(event.target.value)
    console.log('filter', event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter shown with: <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filterChange: value => {
      dispatch(filterChange(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps)
  (Filter)
