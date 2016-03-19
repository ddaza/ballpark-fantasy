import React from 'react';

export default class GameList extends React.Component {
  constructor(props) {
      super(props);
      let { query } = this.props.location;
      this.state = {name: query.name};
  }

  goToPage(e) {
    const element = e.target;
    const eventId = element.name;
    window.location.hash = 'game?eventId=' + eventId + '&name=' + this.state.name;
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Hello, {this.state.name}!</h2>
        <p>Which game are you attending?</p>
        <input
          type='button'
          name='eventId1'
          value='CIN @ CHC'
          onClick={this.goToPage.bind(this)}
        />
      </div>
    );
  }
}
