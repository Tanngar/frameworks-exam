import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import {render, getByAll} from '@testing-library/react';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it('renders App with header text', () => {
//   const container = render(<App/>);
//   expect(container.contains(<Link/>)).toBe(true);
// });

// it('renders App with 2 Link elements', () => {
//   const container = render(<App/>);
//   const link= <Link/>;
//   console.log(container.querySelectorAll(link));
//   expect(link).toBeDefined();

  // expect(container.find(link).length == 2);
// });

// it('nav element contains navbar-dark class', () => {
//   const {container} = render(<App/>);
//   expect(container.querySelector("nav")).toHaveClass("navbar-dark");
// });
