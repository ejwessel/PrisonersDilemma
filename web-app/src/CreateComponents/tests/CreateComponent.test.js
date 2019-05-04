import React from 'react';
import ReactDOM from 'react-dom';
import CreateComponent from '../CreateComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
