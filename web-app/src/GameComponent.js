import React, { Component } from 'react';
import GameJoinComponent from './GameJoinComponents/GameJoinComponent';
import GameEventLogComponent from './GameEventLogComponents/GameEventLogComponent';
import GameScoreboardComponent from './GameScoreboardComponents/GameScoreboardComponent';
import GameTurnsComponent from './GameTurnsComponents/GameTurnsComponent';
import GameCreateScoringComponent from './GameCreateComponents/GameCreateScoringComponent';

class GameComponent extends Component {
  render() {
    return (
      <div>
        <GameJoinComponent />
        <GameEventLogComponent />
        <GameScoreboardComponent />
        <GameTurnsComponent />
        <GameCreateScoringComponent />
      </div>
    );
  }
}

export default GameComponent;
