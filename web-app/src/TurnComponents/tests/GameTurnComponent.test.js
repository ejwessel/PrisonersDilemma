import React from 'react';
import ReactDOM from 'react-dom';
import TurnComponent from '../TurnComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TurnComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
