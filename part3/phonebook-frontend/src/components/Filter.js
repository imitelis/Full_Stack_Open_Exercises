const Filter = ({newSearch, handleSearch}) => {
    return(
      <>
      <form>
          <div>filter shown with <input value={newSearch} onChange={handleSearch}/></div>
      </form>
      </>
    )
  }
  
  export default Filter