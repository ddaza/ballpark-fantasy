import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import Game from './components/Game';
import GameList from './components/GameList';
import About from './components/About';
import Login from './components/Login';

window.React = React;

render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/about" component={About} />
      <Route path="/game" component={Game} />
      <Route path="/game-list" component={GameList} />
      <Route path="/login" component={Login} />
    </Route>
  </Router>), document.getElementById('content')
);
