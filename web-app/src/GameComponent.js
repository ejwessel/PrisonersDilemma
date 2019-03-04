import React, { Component } from 'react';
import GameJoinComponent from './GameJoinComponents/GameJoinComponent';
import GameEventLogComponent from './GameEventLogComponents/GameEventLogComponent';
import GameScoreboardComponent from './GameScoreboardComponents/GameScoreboardComponent';
import GameTurnsComponent from './GameTurnsComponents/GameTurnsComponent';
import GameCreateComponent from './GameCreateComponents/GameCreateComponent';
import getWeb3 from './getWeb3';
import PrisonersDilemmaContract from './contracts/PrisonersDilemma.json';

class GameComponent extends Component {
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Get the contract instance.

      //TODO: We need to display relevant UI to capture information to deploy contract
      const contract = web3.eth.contract(PrisonersDilemmaContract.abi);
      var contractInstance = contract.new(
        [[0, 0, 0], [0, 0, 0], [1, 2, 3, 4]],
        { data: contract.bytecode, from: web3.eth.accounts[0], gas: 4000000 },
        function(error, result) {
          if(!result.address) {
            console.log("transaction hash: " + result.transactionHash);
          } else {
            console.log(result.address);
          }

          // if(!error) {
          //   // console.log(result.address);
          //   console.log(result);
          //   // console.log(JSON.stringify(result));
          // } else {
          //   console.error(error);
          // }
      });

      console.log(contractInstance);

      // console.log(contract.transactionHash);
      // console.log(contract.address);

      // const myContract = new web3.eth.Contract(
      // );

      // var contract = web3.eth.contract(abi);
      // contract.new(
      //      {
      //        from: web3.eth.accounts[0],
      //        data: code,
      //        gas: '4700000'
      //      }, function (e, contract){
      //         console.log(e, contract);
      //         if (typeof contract.address !== 'undefined') {
      //            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
      //          }
      //   });



      // const deployedNetwork = PrisonersDilemmaContract.networks[networkId];

      // console.log(accounts, networkId, deployedNetwork);

      // const instance = new web3.eth.Contract(
      // //   SimpleStorageContract.abi,
      // //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      // alert(
      //   `Failed to load web3, accounts, or contract. Check console for details.`,
      // );
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <GameCreateComponent />
        <GameJoinComponent />
        <GameEventLogComponent />
        <GameScoreboardComponent />
        <GameTurnsComponent />
      </div>
    );
  }
}

export default GameComponent;
