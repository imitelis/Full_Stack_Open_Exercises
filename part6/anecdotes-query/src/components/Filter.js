const Filter = ({setNewSearch}) => {
  
  const handleChange = (event) => {
    setNewSearch(event.target.value)
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

export default Filter