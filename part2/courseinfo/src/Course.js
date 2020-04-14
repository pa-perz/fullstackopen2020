import React from 'react'


const Course = props => {
    return (
      <>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </>
    );
  }
  
  const Header = props => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    );
  };
  
  const Part = props => {
    return (
      <>
        <p>
          {props.name} {props.exercises}
        </p>
      </>
    );
  };
  
  const Content = props => {
    return (
      <>
        {props.parts.map((part, i) => 
          <Part key={i} name={part.name} exercises={part.exercises} />)
        }
      </>
    );
  };
  
  const Total = props => {
    const array = []
    props.parts.map((part, i) =>
      array.push(part.exercises)
    )
    const reducer = (acc, value) => acc + value
    return (
      <>
        <p>Number of exercises {array.reduce(reducer)}</p>
      </>
    );
  };

export default Course