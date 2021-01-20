import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const StatisticsTable = ({good, neutral, bad}) => {
  const all = (good + neutral + bad)
  const average = (good - bad) / all
  const positive = good / all

  return (
    <table>
      <tbody>
        <StatisticsRow type="Good" value={good} />
        <StatisticsRow type="Neutral" value={neutral} />
        <StatisticsRow type="Bad" value={bad} />
        <StatisticsRow type="All" value={all} />
        <StatisticsRow type="Average" value={average} />
        <StatisticsRow type="Positive" value={positive} inPercent/>
      </tbody>
    </table>
  )
}

const StatisticsRow = ({type, value, inPercent = false}) => (
  <tr>
    <td>{type}</td>
    <td>{inPercent ? `${value*100}%`: value}</td>
  </tr>
)

const FeedbackBtn = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const noFeedback = !good && !neutral && !bad
  
  return <div>
    <div className="feedback-plane">
      <h1>Give Feedback</h1>
      <div className="feedback-button-group">
        <FeedbackBtn text="Good" onClick={() => setGood(good+1)} />
        <FeedbackBtn text="Neutral" onClick={() => setNeutral(neutral+1)} />
        <FeedbackBtn text="Bad" onClick={() => setBad(bad+1)} />
      </div>
    </div>
    <div className="statistics-plane">
      <h2>Statistics</h2>
      {noFeedback
      ? <div>No feedback given.</div>
      : <StatisticsTable good={good} neutral={neutral} bad={bad} />
      }
    </div>
  </div>
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
