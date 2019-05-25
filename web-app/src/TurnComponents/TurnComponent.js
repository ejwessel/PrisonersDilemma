import React, { Component } from 'react';
import PlayerChoiceComponent from './PlayerChoiceComponent';

class TurnComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPlayerAddress: this.loadCurrentPlayerAddress()
    }
  }

  componentDidMount() {
    //this makes the assumption that the current address is already set
    window.ethereum.on('accountsChanged', async() => {
      console.log("detected account change");
      let accounts = await window.ethereum.enable();
      let currentAccount = accounts[0];
      this.setState({ currentPlayerAddress: currentAccount })
      console.log(currentAccount);
    });
  }

  async loadCurrentPlayerAddress() {
    let address = await this.props.web3.eth.getAccounts()
    this.setState({ currentPlayerAddress: address[0] })
  }

  render() {
    return (

      <div>
        <PlayerChoiceComponent 
          web3 = { this.props.web3 }
          contract = { this.props.contract }
          submitChoice = { this.props.submitChoice }
          playerAddress = { this.state.currentPlayerAddress }
        />
      </div>
    );
  }
}

export default TurnComponent;
