import React, { Component } from 'react';
import PlayerChoiceComponent from './PlayerChoiceComponent';

class GameTurnsComponent extends Component {
  render() {
    return (
      <PlayerChoiceComponent 
        web3={ this.props.web3 }
        contract = { this.props.contract }
      />
    );
  }
}

export default GameTurnsComponent;
