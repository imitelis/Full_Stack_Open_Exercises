const Filter = ({newSearch, setNewSearch}) => {
  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }
  return(
    <>
    <h2>Filter by name</h2>
    <form>
      <div>filter shown with: <input value={newSearch} onChange={handleSearch}/></div>
    </form>
    </>
  )
}
  
export default Filter