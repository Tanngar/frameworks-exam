import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import {render, getByAll} from 'react-testing-library';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders App with header text', () => {
  const container = render(<App/>);
  expect(container.contains(<Link/>)).toBe(true);
});

it('nav element contains navbar-dark class', () => {
  const {container} = render(<App/>);
  expect(container.querySelector("nav")).toHaveClass("navbar-dark");
});
