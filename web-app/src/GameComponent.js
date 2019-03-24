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

    //set player data
    this.setPlayer1 = this.setPlayer1.bind(this);
    this.setPlayer2 = this.setPlayer2.bind(this);
    this.deployContract = this.deployContract.bind(this);
  }

  setPlayer1(playerAddress, choice, score) {
    this.setState({player1: {playerAddress, choice, score}});
  }

  setPlayer2(playerAddress, choice, score) {
    this.setState({player2: {playerAddress, choice, score}});
  }

  componentDidMount = async () => {
    this.setState({web3: await getWeb3()});
  }

  async deployContract() {
    //save data in parent, deploy contract
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
    console.log("contract should have an address now!");
    console.log(contract._address);
  }

  render() {
    return (
      <div>
        <GameCreateComponent 
          setPlayer1={this.setPlayer1} 
          setPlayer2={this.setPlayer2} 
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
