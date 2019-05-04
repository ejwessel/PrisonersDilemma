import React from 'react';
import ReactDOM from 'react-dom';
import ScoreboardComponent from '../ScoreboardComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ScoreboardComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
