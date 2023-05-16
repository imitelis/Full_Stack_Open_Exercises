const Finder = ({newSearch, handleSearch}) => {
    return(
      <>
      <form>
          <div>find countries <input value={newSearch} onChange={handleSearch}/></div>
      </form>
      </>
    )
  }
  
  export default Finder