import React from 'react';

var Firebase = require('firebase');

export default class GameList extends React.Component {
  constructor(props) {
      super(props);
      let { query } = this.props.location;
      this.state = {name: query.name};
  }

  handleSelectedGame(e) {
    const element = e.target;
    const eventId = element.name;
    
    // Get reference to firebase
    var rootRef = new Firebase('https://ballparkfantasy.firebaseio.com');

    // Generate a game code by truncating an auto id to 6 characters
    var sessionCode = '';
    while (sessionCode.length == 0 || sessionCode.indexOf('-') >= 0) {
      sessionCode = rootRef.child('session').push().key();
      sessionCode = sessionCode.substring(1,7).toUpperCase();
    }

    // Write session to the generated game code
    var sessionRef = rootRef.child('session').child(sessionCode);
    var names = {};
    names[this.state.name] = true;
    var sessionValue = { 'users' : names,
                         'eventId': eventId,
                         'started': 'false'};
    sessionRef.set(sessionValue);

    // Go to the game page
    window.location.hash = 'game?eventId=' + eventId + '&name=' + this.state.name;
    e.preventDefault();
  }

  render() {
    if (!this.state.name) {
      return (
        <h3>Please log in to continue</h3>
      )
    }
    //TODO: this is a temporary fake button; generate game table from API response instead
    return (
      <div>
        <h2>Hello, {this.state.name}!</h2>
        <p>Which game are you watching?</p>
        <input
          type='button'
          name='eventId1'
          value='CIN @ CHC'
          onClick={this.handleSelectedGame.bind(this)}
        />
      </div>
    );
  }
}
