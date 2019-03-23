import React, { Component } from 'react';
import GameJoinComponent from './GameJoinComponents/GameJoinComponent';
import GameEventLogComponent from './GameEventLogComponents/GameEventLogComponent';
import GameScoreboardComponent from './GameScoreboardComponents/GameScoreboardComponent';
import GameTurnsComponent from './GameTurnsComponents/GameTurnsComponent';
import GameCreateComponent from './GameCreateComponents/GameCreateComponent';
import getWeb3 from './getWeb3';


class GameComponent extends Component {
  state = {
    web3: null
  };

  componentDidMount = async () => {
    this.setState({web3: await getWeb3()});
  }

  render() {
    return (
      <div>
        <GameCreateComponent web3={this.state.web3}/>
        {/* <GameJoinComponent />
        <GameEventLogComponent />
        <GameScoreboardComponent />
        <GameTurnsComponent />  */}
      </div>
    );
  }
}

export default GameComponent;
