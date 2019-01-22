import React from 'react';
import ReactDOM from 'react-dom';
import GameScoreboardPlayerScoreComponent from '../GameScoreboardPlayerScoreComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameScoreboardPlayerScoreComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
