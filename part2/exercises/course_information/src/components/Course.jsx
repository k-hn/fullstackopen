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

export { Course }