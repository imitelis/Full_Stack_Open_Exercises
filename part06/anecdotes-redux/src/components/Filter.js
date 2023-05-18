import { useDispatch } from 'react-redux'

import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    // dispatch(filterChange(event.target.value))
    dispatch(filterChange(event.target.value))
    console.log('filter', event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter