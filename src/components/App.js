import React from 'react';
import { Link } from 'react-router';

const App = ({ children }) => (
  <div>
    <header>
      <h1>Ball Park Fantasy</h1>
      <Link to="/about">About</Link>
      <Link to="/game-list">Game List</Link>
      <Link to="/login">Login</Link>
    </header>
    <section>
      {children || 'Welcome to Fantasy'}
    </section>
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
