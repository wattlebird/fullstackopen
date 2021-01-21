import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const AnecdotesVoter = ({anecdote, vote, onNext, onVote}) => {
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdote}</p>
      <div>Has {vote} votes.</div>
      <div>
        <button onClick={onVote}>Vote</button>
        <button onClick={onNext}>Next anecdote</button>
      </div>
    </div>
  )
}

const AnecdotesCounter = ({anecdote, vote}) => {
  return (
    <div>
      <h1>Anecdote with Most Votes</h1>
      <p>{anecdote}</p>
      <div>Has {vote} votes.</div>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const onNext = useCallback(() => {
    let i = Math.floor(Math.random() * 6)
    if (i === 6) i = 0
    setSelected(i)
  }, [setSelected])

  const onVote = useCallback(() => {
    setVotes(prevVotes => {
      const nxtVotes = [...prevVotes]
      nxtVotes[selected]+=1
      return nxtVotes
    })
  }, [selected, setVotes])

  const mostVoted = useMemo(() => {
    let i = 0;
    votes.forEach((itm, idx) => i = itm > votes[i] ? idx : i)
    return i
  }, [votes])

  return (
    <>
      <AnecdotesVoter anecdote={anecdotes[selected]} vote={votes[selected]} onNext={onNext} onVote={onVote} />
      <AnecdotesCounter anecdote={anecdotes[mostVoted]} vote={votes[mostVoted]} />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />,
  </React.StrictMode>,
  document.getElementById('root')
);
