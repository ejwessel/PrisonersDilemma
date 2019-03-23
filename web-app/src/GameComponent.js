import React, { Component } from 'react';
import GameJoinComponent from './GameJoinComponents/GameJoinComponent';
import GameEventLogComponent from './GameEventLogComponents/GameEventLogComponent';
import GameScoreboardComponent from './GameScoreboardComponents/GameScoreboardComponent';
import GameTurnsComponent from './GameTurnsComponents/GameTurnsComponent';
import GameCreateComponent from './GameCreateComponents/GameCreateComponent';
import getWeb3 from './getWeb3';
import PrisonersDilemmaContract from './contracts/PrisonersDilemma.json';

class GameComponent extends Component {
  render() {
    return (
      <div>
        <GameCreateComponent />
        <GameJoinComponent />
        <GameEventLogComponent />
        <GameScoreboardComponent />
        <GameTurnsComponent />
      </div>
    );
  }
}

export default GameComponent;
