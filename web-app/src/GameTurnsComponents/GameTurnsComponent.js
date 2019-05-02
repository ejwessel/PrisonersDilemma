import React, { Component } from 'react';
import GameTurnsPlayerChoiceComponent from './GameTurnsPlayerChoiceComponent';

class GameTurnsComponent extends Component {
  render() {
    return (
      <GameTurnsPlayerChoiceComponent 
        web3={ this.props.web3 }
        contract = { this.props.contract }
      />
    );
  }
}

export default GameTurnsComponent;
