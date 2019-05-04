import React from 'react';
import ReactDOM from 'react-dom';
import GameScoreboardComponent from '../GameScoreboardComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameScoreboardComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
