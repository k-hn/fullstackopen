const Header = ({ course }) => <h1>{course.name}</h1>

const Total = (props) => {
  const exerciseArr = props.course.parts.map(part => part.exercises)
  const sum = exerciseArr.reduce(
    (acc, currentValue) => acc + currentValue, 0
  )

  return (
    <p><b>total of {sum} exercise(s)</b></p>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}


const Content = (props) => {
  const { parts } = props.course
  const partsList = parts.map(
    part => <Part part={part} />
  )
  return (
    <>
      {partsList}
    </>
  )
}


const Course = (props) => {
  const { course } = props

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
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

  const courseComponentList = courses.map(
    course => <Course key={course.id} course={course} />
  )


  return (
    <div>
      {courseComponentList}
    </div>
  )
  // return (
  //   { courses.map(course => <Course course={course}) }
  // )
}

export default App
