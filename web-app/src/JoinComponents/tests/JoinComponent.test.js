import React from 'react';
import ReactDOM from 'react-dom';
import JoinComponent from '../JoinComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JoinComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
