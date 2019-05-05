import React, { Component } from 'react';
import PlayerChoiceComponent from './PlayerChoiceComponent';

class TurnComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPlayerAddress: null
    }
  }

  async loadCurrentPlayerAddress() {
    let address = await this.props.web3.eth.getAccounts()
    this.setState({ currentPlayerAddress: address })
  }

  render() {
    return (
      <PlayerChoiceComponent 
        web3 = { this.props.web3 }
        contract = { this.props.contract }
        submitChoice = { this.props.submitChoice }
      />
    );
  }
}

export default TurnComponent;
