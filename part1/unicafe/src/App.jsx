import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalSum = good + neutral + bad
  const positivePercent = good / totalSum
  
  if (!totalSum) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <StatsLine text="good" val={good} />
      <StatsLine text="neutral" val={neutral} />
      <StatsLine text="bad" val={bad} />
      <StatsLine text="all" val={good + neutral + bad} />
      <StatsLine text="average" val={(good - bad) / (good + neutral + bad)} />
      <StatsLine text="positive" val={`${positivePercent * 100} %`}/>
    </>
  )
}

const StatsLine = ({text, val}) => {
  return (
    <>
      <p>{text} {val}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementCategory = (category, setterFn) => setterFn(category + 1)

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => incrementCategory(good, setGood)} text="good"/>
      <Button onClick={() => incrementCategory(neutral, setNeutral)} text="neutral"/>
      <Button onClick={() => incrementCategory(bad, setBad)} text="bad"/>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App