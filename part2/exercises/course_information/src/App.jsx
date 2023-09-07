// Header
const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

// Part
const Part = (props) => {
  return (
    <>
      <p>{props.part.name} {props.part.exercise}</p>
    </>
  )
}

// Content
const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

// Total
const Total = ({ parts }) => {
  // Calculate total using reduce
  const total = Object.values(parts).reduce((acc, { exercises }) => exercises + acc, 0)

  return (
    <>
      <p><b>Number of exercises {total}</b></p>
    </>
  )
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
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
    <>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App