import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if ((props.good + props.neutral + props.bad) === 0) {
    return <p>No feedback given</p>;
  }

  return (
  <table>
    <tbody>
      <tr>
      <td>good</td>
      <Statistic value={props.good} />
    </tr>
      <tr>
        <td>neutral</td>
        <Statistic value={props.neutral} />
      </tr>
      <tr>
        <td>bad</td>
        <Statistic value={props.bad} />
      </tr>
      <tr>
        <td>all</td>
        <Statistic value={props.all} />
      </tr>
      <tr>
        <td>average</td>
        <Statistic value={(props.good + props.bad * - 1 ) / (props.all)} />
      </tr>
      <tr>
        <td>positive</td>
        <Statistic value={(props.good / (props.all)) * 100} ending="%"/>
      </tr>
    </tbody>
  </table>)
}

const Statistic = (props) => {
  return (<td>{props.value} {props.ending}</td>)
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
