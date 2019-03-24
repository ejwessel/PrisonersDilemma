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
    var contract = await new web3.eth.Contract(contract_abi);
    console.log("contract instance: ");
    console.log(contract);

    var contract_byte_code = PrisonersDilemma['bytecode'];
    var options = {
        data : contract_byte_code,
        arguments : [
            [this.state.player1.address, this.state.player1.choice, this.state.player1.score],
            [this.state.player2.address, this.state.player2.choice, this.state.player2.score],
            [this.state.scoreData.winScore, this.state.scoreData.mutualScore, this.state.scoreData.greedScore, this.state.scoreData.mutualGreedScore]
        ]
    };

    var contract = await contract.deploy(options)
    .send({
      from: accounts[0],
      gas: 15000,
      gasPrice: '300000'
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
