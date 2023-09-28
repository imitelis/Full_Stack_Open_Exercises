import {
    useParams
  } from 'react-router-dom'

const AnecdoteView = ({ anecdote, voteById }) => {

    const { id } = useParams();
  
    const handleVote = () => {
      voteById(id);
    };
  
    return(
      <div>
        <h2>{anecdote?.content ?? " "} by <em>{anecdote?.author ?? " "}</em></h2>
        <p>for more info see: <a href={anecdote?.info ?? " "}>{anecdote?.info ?? " "}</a></p>
        <p>has {anecdote?.votes ?? 0} votes</p>
        <button onClick={handleVote}>vote</button>
      </div>
    )
  }

export default AnecdoteView;