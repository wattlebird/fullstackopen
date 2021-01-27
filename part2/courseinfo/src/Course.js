import React from 'react'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  const {parts} = props
  return (
    <div>
      {parts.map(itm => <Part name={itm.name} exercise={itm.exercises} key={itm.id} />)}
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

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total count={course.parts.reduce((acc, cur) => acc + cur.exercises, 0)} />
    </div>
  )
}

export default Course;