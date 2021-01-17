import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  const {courses} = props
  return (
    <div>
      {courses.map(itm => <Part name={itm.name} exercise={itm.exercise} />)}
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
  const courses = [
    {name: 'Fundamentals of React', exercise: 10},
    {name: 'Using props to pass data', exercise: 7},
    {name: 'State of a component', exercise: 14}
  ]
  const course = 'Half Stack application development'

  return (
    <div>
      <Header course={course} />
      <Content courses={courses} />
      <Total count={courses.reduce((acc, cur) => acc + cur.exercise, 0)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))