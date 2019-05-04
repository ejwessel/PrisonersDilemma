import React from 'react';
import ReactDOM from 'react-dom';
import PlayerScoreComponent from '../PlayerScoreComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayerScoreComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
