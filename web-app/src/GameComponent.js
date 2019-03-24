import React, { Component } from 'react';
import GameJoinComponent from './GameJoinComponents/GameJoinComponent';
import GameEventLogComponent from './GameEventLogComponents/GameEventLogComponent';
import GameScoreboardComponent from './GameScoreboardComponents/GameScoreboardComponent';
import GameTurnsComponent from './GameTurnsComponents/GameTurnsComponent';
import GameCreateComponent from './GameCreateComponents/GameCreateComponent';
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


    this.setPlayer1 = this.setPlayer1.bind(this);
    this.setPlayer2 = this.setPlayer2.bind(this);

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



  render() {
    return (
      <div>
        <GameCreateComponent 
          setPlayer1={this.setPlayer1} 
          setPlayer2={this.setPlayer2} 
          web3={this.state.web3}/>
          
        {/* <GameJoinComponent />
        <GameEventLogComponent />
        <GameScoreboardComponent />
        <GameTurnsComponent />  */}
      </div>
    );
  }
}

export default GameComponent;
