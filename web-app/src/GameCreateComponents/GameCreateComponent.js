import React, { Component } from 'react';
import GameCreatePlayerComponent from './GameCreatePlayerComponent';
import GameCreateScoringComponent from './GameCreateScoringComponent';
import PrisonersDilemma from "../contracts/PrisonersDilemma.json";

class GameCreateComponent extends Component {
  constructor(props) {
    super(props);

    this.deployContract = this.deployContract.bind(this);
  }

  async deployContract() {
    const {web3} = this.props;
    var accounts = await web3.eth.getAccounts();
    var contract_abi = PrisonersDilemma['abi'];
    var contract = await new this.props.web3.eth.Contract(contract_abi);
    console.log("contract instance: ");
    console.log(contract);

    var contract_byte_code = PrisonersDilemma['bytecode'];
    var options = {
        data : contract_byte_code, 
        arguments : [
            [accounts[0], 0, 0],
            [accounts[0], 0, 0],
            [20, 5, 1, 0]
        ]
    };

    var contract = await contract.deploy(options)
    .send({
      from: accounts[0],
      gas: 15000,
      gasPrice: '300000'
    });

    console.log(contract);
    console.log("contract should ahve an address now!");
    console.log(contract._address);
  }


  render() {
    return (
      <div>
        <form >
          <GameCreatePlayerComponent playerNum={1} />
          <GameCreatePlayerComponent playerNum={2} />
          <GameCreateScoringComponent />
          <button onClick={this.deployContract}>Start Game</button>
        </form>
      </div>
    );
  }
}

export default GameCreateComponent;
