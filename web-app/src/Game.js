import React, { Component } from 'react';
import JoinComponent from './JoinComponents/JoinComponent';
import EventLogComponent from './EventLogComponents/EventLogComponent';
import ScoreboardComponent from './ScoreboardComponents/ScoreboardComponent';
import TurnComponent from './TurnComponents/TurnComponent';
import CreateComponent from './CreateComponents/CreateComponent';
import PrisonersDilemma from "./contracts/PrisonersDilemma.json";
import getWeb3 from './getWeb3';

class Game extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      web3: null,
      player1: {},
      player2: {},
      scoreData: {},
      PrisonersContract: null,
      winner: null,
      eventLogger: ""
    };

    this.deployContract = this.deployContract.bind(this);
    this.submitChoice = this.submitChoice.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.endGame = this.endGame.bind(this);
    this.setContract = this.setContract.bind(this);
    this.getPlayerScore = this.getPlayerScore.bind(this);
  }

  async componentDidMount() {
    this.setState({web3: await getWeb3()});
  }

  async setContract(newContractAddress) {
    //take address and make an object that targets contract
    const {web3} = this.state;
    var accounts = await web3.eth.getAccounts();
    var contract_abi = PrisonersDilemma['abi'];
    var contract = await new web3.eth.Contract(
      contract_abi,
      newContractAddress,
      { transactionConfirmationBlocks:1, transactionPollingTimeout: 3 }
    );

    console.log("contract instance: ");
    console.log(contract);
    this.setState({PrisonersContract: contract});
    await this.checkWinner();
  }

  async deployContract(player1, player2, scoreData) {

    await this.setState({player1, player2, scoreData});
    console.log(this.state);

    //save data in parent, deploy contract
    const {web3} = this.state;
    var accounts = await web3.eth.getAccounts();
    var contract_abi = PrisonersDilemma['abi'];
    var contract = await new web3.eth.Contract(
      contract_abi,
      null,
      { transactionConfirmationBlocks:1, transactionPollingTimeout: 3 }
   );

    console.log("contract instance: ");
    console.log(contract);

    var contract_byte_code = PrisonersDilemma['bytecode'];
    var options = {
        data : contract_byte_code,
        arguments : [
            [this.state.player1.address, Number(this.state.player1.choice), Number(this.state.player1.score)],
            [this.state.player2.address, Number(this.state.player2.choice), Number(this.state.player2.score)],
            [Number(this.state.scoreData.winScore), Number(this.state.scoreData.greedScore), Number(this.state.scoreData.mutualScore), Number(this.state.scoreData.mutualGreedScore)]
        ]
    };

    console.log(options);


    //print log that the contract was initialized
    contract.events.allEvents(
      null,
      (error, event) => { 
        console.log("EVENT: " + event.event); 
        this.setState({ eventLogger: this.state.eventLogger.concat("\n" + event.event) })
        console.log(this.state.eventLogger)
      }
    );
    
    var contract = await contract.deploy(options)
    .send({
      from: accounts[0],
      gas: 3500000,
      gasPrice: '15000000'
    });

    console.log(contract);
    console.log("contract should have an address now!");
    console.log(contract.address);

    this.setState({ PrisonersContract: contract })
    await this.checkWinner();
  }

  async submitChoice(choice) {
    //call contarct with current account
    //check that contract has address first before continuing
    var accounts = await this.state.web3.eth.getAccounts();
  
    //listen for when player selects choice
    if(this.state.PrisonersContract != null) {
      console.log("Player Selected: " + choice);

      var transaction = await this.state.PrisonersContract.methods
        .playerChoose(choice).send({
          from: accounts[0]
        });
      console.log(transaction);

      await this.checkWinner();
      let player1Score = await this.getPlayerScore(this.state.player1.address);
      this.setState({ 
        player1: { ...this.state.player1, score: player1Score }
      });
      console.log(this.state.player1.score)

      let player2Score = await this.getPlayerScore(this.state.player2.address);
      this.setState({ 
        player2: { ...this.state.player2, score: player2Score }
      });
      console.log(this.state.player2.score)

    } else {
      console.log("Contract has not been deployed");
    }
  }

  async checkWinner() {
    var accounts = await this.state.web3.eth.getAccounts();

    if(this.state.PrisonersContract != null){
      var winnerVal = await this.state.PrisonersContract.methods
        .winner.call({
          from: accounts[0]
      });
      console.log("winner: " + winnerVal);
      this.setState({winner: winnerVal});
    } else {
      console.log("Contract has not been deployed");
    }
  }

  async getPlayerScore(playerAddress) {
    var accounts = await this.state.web3.eth.getAccounts();

    if(this.state.PrisonersContract != null){
      var playerScore = await this.state.PrisonersContract.methods
        .getPlayerScore(playerAddress).call({
          from: accounts[0]
      });
      console.log(playerScore);
      return playerScore;
    } else {
      console.log("Contract has not been deployed");
    }
  }

  async endGame() {
    var accounts = await this.state.web3.eth.getAccounts();

    if(this.state.PrisonersContract != null){
      var transaction = await this.state.PrisonersContract.methods
        .endGame.send({
          from: accounts[0]
      });
      console.log(transaction);
    } else {
      console.log("Contract has not been deployed");
    }
  }

  render() {
    if (this.state.PrisonersContract == null) {
      return (
        <div>
          <CreateComponent deployContract={ this.deployContract } />
          <br/>
          <JoinComponent setContract={ this.setContract } />
        </div>
      );
    } else {
      return(
        <div>
          <TurnComponent
            web3 = { this.state.web3 }
            contract = { this.state.PrisonersContract }
            submitChoice = { this.submitChoice } 
            endGame = { this.endGame }
          />
          <ScoreboardComponent
            player1 = { this.state.player1 } 
            player2 = { this.state.player2 }
            maxScore = { this.state.scoreData.winScore }
          />
          <EventLogComponent logger = { this.state.eventLogger } />
          <br/>
          {
            this.state.winner !== '0x0000000000000000000000000000000000000000' ?
            (<button onClick={this.props.endGame}>end game</button>) : null
          }
        </div>
      )
    }
  }
}

export default Game;
