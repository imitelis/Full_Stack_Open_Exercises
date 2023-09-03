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

const Courses = ({courses}) => {
  return (
    <>
    {courses.map(course => <Course key={course.id} course={course}/>)}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Course Info</h1>
      <h2>Web development curriculum</h2>
      <Courses courses={courses}/>
    </div>
  )
}

export default App