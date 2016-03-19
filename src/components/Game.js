import React from 'react';

var Firebase = require('firebase');

export default class Game extends React.Component {
  constructor(props) {
      super(props);
      let { query } = this.props.location;
      this.state = { name: query.name,
                     code: query.code };
  }

  componentWillMount() {
    if (this.state.name && this.state.code) {
      var sessionRef = new Firebase('https://ballparkfantasy.firebaseio.com/session').child(this.state.code);
      var userRef = sessionRef.child('users').child(this.state.name);
      userRef.once('value', function(dataSnapshot) {
        // Write this new name if it doesn't already exist in this game.
        if (!dataSnapshot.exists()) {
          userRef.set(true);
        }
      });

      var eventRef = sessionRef.child('eventId');
      eventRef.once('value', function(dataSnapshot) {
        if (dataSnapshot.exists()) {
          this.setState({ event: dataSnapshot.val() });
        }
      }.bind(this));
    }
  }

  render() {
    //TODO: render the game
    return (
      <p>{this.state.event}</p>
    );
  }
}
