import React from 'react';

function GameCreateScoringComponent({ setWinScore, setGreedPoints, 
  setMutualPoints, setMutualGreedPoints}) {

    return (
      <div>
        <label>Scoring:</label>
        {' '}
        <input
          type = "text"
          placeholder = "Win Score"
          onChange = { setWinScore }
        />
        {' '}
        <input
          type = "text"
          placeholder = "Greed Points"
          onChange = { setGreedPoints }
        />
        {' '}
        <input
          type = "text"
          placeholder = "Mutual Points"
          onChange = { setMutualPoints }
        />
        {' '}
        <input
          type = "text"
          placeholder = "Mutual Greed Points"
          onChange = { setMutualGreedPoints }
        />
      </div>
    );
}

export default GameCreateScoringComponent;
