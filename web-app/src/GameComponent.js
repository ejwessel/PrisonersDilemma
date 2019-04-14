import React, { Component } from 'react';
import GameJoinComponent from './GameJoinComponents/GameJoinComponent';
import GameEventLogComponent from './GameEventLogComponents/GameEventLogComponent';
import GameScoreboardComponent from './GameScoreboardComponents/GameScoreboardComponent';
import GameTurnsComponent from './GameTurnsComponents/GameTurnsComponent';
import GameCreateComponent from './GameCreateComponents/GameCreateComponent';
import PrisonersDilemma from "./contracts/PrisonersDilemma.json";
import getWeb3 from './getWeb3';

class GameComponent extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      web3: null,
      player1: {},
      player2: {},
      scoreData: {}
    };

    this.deployContract = this.deployContract.bind(this);
  }

  componentDidMount = async () => {
    this.setState({web3: await getWeb3()});
  }

  async deployContract(player1, player2, scoreData) {

    await this.setState({player1, player2, scoreData});
    console.log(this.state);

    //save data in parent, deploy contract
    const {web3} = this.state;
    var accounts = await web3.eth.getAccounts();
    var contract_abi = PrisonersDilemma['abi'];
    var contract = await new web3.eth.Contract(contract_abi, null, {transactionConfirmationBlocks:1});
    console.log("contract instance: ");
    console.log(contract);

    var contract_byte_code = PrisonersDilemma['bytecode'];
    var options = {
        data : contract_byte_code,
        arguments : [
              [accounts[0], 0, 0],
              [accounts[0], 0, 0],
              [20, 5, 1, 0]
//            [this.state.player1.address, Number(this.state.player1.choice), Number(this.state.player1.score)],
//            [this.state.player2.address, Number(this.state.player2.choice), Number(this.state.player2.score)],
//            [Number(this.state.scoreData.winScore), Number(this.state.scoreData.mutualScore), Number(this.state.scoreData.greedScore), Number(this.state.scoreData.mutualGreedScore)]
        ]
    };

    console.log(options);

    var contract = await contract.deploy(options)
    .send({
      from: accounts[0],
      gas: 3500000,
      gasPrice: '15000000'
    });

    console.log(contract);
    console.log("contract should have an address now!");
    console.log(contract._address);
  }

  render() {
    return (
      <div>
        <GameCreateComponent 
          deployContract={this.deployContract}
        />
          
        {/* <GameJoinComponent />
        <GameEventLogComponent />
        <GameScoreboardComponent />
        <GameTurnsComponent />  */}
      </div>
    );
  }
}

export default GameComponent;
