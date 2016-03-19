import React from 'react';

export default class GameList extends React.Component {

  goToPage(e) {
    const element = e.target;
    const pageName = element.name;
    window.location.hash = `${pageName}?test=test`;
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>HELLO</h2>
        <input
          type='button'
          name='about'
          value='About Page'
          onClick={this.goToPage}
        />
      </div>
    );
  }
}
