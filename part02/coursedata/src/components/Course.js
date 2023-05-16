const Course = ({course}) => {
    return (
      <>
      <Header name={course.name}/>
      <Contents course={course}/>
      <Total course={course}/>
      </>
    )
  }
  
  const Header = ({name}) => {
    return (
      <h3>{name}</h3>
    )
  }
  
  
  const Part = ({part, exercises}) => {
    return (
      <>
      <p>{part} {exercises}</p>
      </>
    )
  }
  
  const Contents = ({course}) => {
    return (
      <>
        {course.parts.map(cou => <Part key={cou.id} part={cou.name} exercises={cou.exercises}/>)}
      </>
    )
  }

  const Total = ({course}) => {
    const totalexercises = course.parts.reduce((t, {exercises}) => t + exercises, 0)
    return(
      <>
      <b>total of {totalexercises} exercises</b>
      </>
    )
  }

export default Course