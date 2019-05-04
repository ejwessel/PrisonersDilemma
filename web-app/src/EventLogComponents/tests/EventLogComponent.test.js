import React from 'react';
import ReactDOM from 'react-dom';
import EventLogComponent from '../EventLogComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventLogComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
