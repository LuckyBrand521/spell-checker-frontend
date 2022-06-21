import React, {useState} from 'react';
import axios from 'axios';
import './styles.css';
function MyForm() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const handleSubmit=() => {
    let config = {
      method: 'post',
      url: `http://localhost:31337/spellcheck/${word}`,
    };
    
    axios(config)
    .then(function (response) {
      setSuggestions(response.data.suggestions);
      setResult(response.data.correct);
    })
    .catch(function (error) {
      setResult(error.response.data.correct);
      setSuggestions([]);
    });
  }
  return (
    <form onSubmit={e=>e.preventDefault()}>
      <label>Enter your word:  </label>
      <input type="text" value={word} onChange={(e)=> setWord(e.target.value)}></input>
      <button onClick={handleSubmit} disabled={!word}>Submit</button>
      <br/>
      <div>
      <br/>
        <label>Correct: {`${result}`}</label>
        <div className="suggestion-wrapper">
          <label>Suggesions: </label>
          <div>
            {suggestions.map((item) => {
              return (
                <p 
                  key={item} 
                  onClick={() => setWord(item)}
                  className="suggestion"
                >
                {item}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </form>
  );
}

export default MyForm;