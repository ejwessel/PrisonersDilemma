import React, { Component } from 'react';
import GameJoinComponent from './GameJoinComponents/GameJoinComponent';
import GameEventLogComponent from './GameEventLogComponents/GameEventLogComponent';
import GameScoreboardComponent from './GameScoreboardComponents/GameScoreboardComponent';
import GameTurnsComponent from './GameTurnsComponents/GameTurnsComponent';
import GameCreateComponent from './GameCreateComponents/GameCreateComponent';
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
      PrisonersContract: null
    };

    this.deployContract = this.deployContract.bind(this);
    this.submitChoice = this.submitChoice.bind(this);
  }

  // grab web3 on document load
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
    var contractPreDeployment = await new web3.eth.Contract(
      contract_abi,
      null,
      { transactionConfirmationBlocks:1, transactionPollingTimeout: 3 }
   );

    console.log("contract instance: ");
    console.log(contractPreDeployment);

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

    //print log that the contract was initialized
    contractPreDeployment.once(
      "ContractInitialized",
      null,
      (error, event) => { console.log("EVENT: " + event.event); }
    );


    var contractPostDeployment = await contractPreDeployment.deploy(options)
      .send({
        from: accounts[0],
        gas: 3500000,
        gasPrice: '15000000'
      });
      
    console.log(contractPostDeployment);
    console.log("contract should have an address now!");
    console.log(contractPostDeployment.address);

    this.setState({ PrisonersContract: contractPostDeployment })

  }

  async submitChoice() {
    //call contract with current account
    //check that contract has address first before continuing
    var accounts = await this.state.web3.eth.getAccounts();
   
    if (this.state.PrisonersContract) {
      this.state.PrisonersContract.once (
        "PlayerSelectedChoice",
        null,
        (error, event) => { console.log("EVENT: " + event.event); }
      );

      var transaction = await this.state.PrisonersContract.methods
        .playerChoose(1).send({
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
          <GameCreateComponent deployContract={ this.deployContract } />
        </div>
        /* <GameJoinComponent /> */
      );
    } else {
      return(
        <div>
          <GameTurnsComponent
            web3={ this.state.web3 }
            contract={ this.state.PrisonersContract }
          />

          {
            //<button type="button" onClick={this.submitChoice}>Submit Choice</button>
            //<GameEventLogComponent />
            //<GameScoreboardComponent />
          }
        </div>
      )
    }
  }
}

export default Game;
