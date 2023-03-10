function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Footer course={course} />
    </div>
  );
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  const partsObj = props.course.parts;
  const partsList = [];

  partsObj.forEach(partInfo => {
    partsList.push(<Part part={partInfo} />)
  })

  return (
    <div>
      {partsList}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Footer = (props) => {
  const partsObj = props.course.parts;
  let totalExercises = 0;

  partsObj.forEach(partInfo => {
    totalExercises = totalExercises + partInfo.exercises;
  })

  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}



export default App;
