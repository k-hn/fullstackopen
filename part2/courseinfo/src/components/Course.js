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
    part => <Part key={part.id} part={part} />
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

export default Course