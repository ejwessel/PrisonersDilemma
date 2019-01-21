import React from 'react';
import ReactDOM from 'react-dom';
import GameJoinComponent from '../GameJoinComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameJoinComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
