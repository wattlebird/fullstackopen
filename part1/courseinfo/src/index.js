import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  const {parts} = props
  return (
    <div>
      {parts.map(itm => <Part name={itm.name} exercise={itm.exercise} />)}
    </div>
  )
}

const Part = (props) => {
  const {name, exercise} = props
  return <p>{name} {exercise}</p>
}

const Total = (props) => {
  const {count} = props;
  return <p>Number of exercises: {count}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercise: 10},
      {name: 'Using props to pass data', exercise: 7},
      {name: 'State of a component', exercise: 14}
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total count={course.parts.reduce((acc, cur) => acc + cur.exercise, 0)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))