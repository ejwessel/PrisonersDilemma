import React, { Component } from 'react';
import PlayerChoiceComponent from './GameTurnsPlayerChoiceComponent';

class TurnComponent extends Component {
  render() {
    return (
      <PlayerChoiceComponent 
        web3={ this.props.web3 }
        contract = { this.props.contract }
      />
    );
  }
}

export default TurnComponent;
