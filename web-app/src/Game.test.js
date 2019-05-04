import React from 'react';
import ReactDOM from 'react-dom';
import GameComponent from './GameComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
