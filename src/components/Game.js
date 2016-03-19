import React from 'react';
import {getGameSummary} from '../api';

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
          getGameSummary(dataSnapshot.val())
          .then((result) => {
            this.setState({ event: result});
          });
        }
      }.bind(this));
    }
  }

  render() {
    //TODO: render the game
    return (
      <div>
        <p>{ this.state.event ? this.state.event.getIn(['game', 'home', 'market']) : null} { this.state.event ? this.state.event.getIn(['game', 'home', 'name']) : null}</p>
        { this.state.event ?
          this.state.event.getIn(['game', 'home', 'players']).map((player) => {
            return (
              <div>
                {player.get('first_name')} {player.get('last_name')}
              </div>
            );
          }) : null
        }
      </div>
    );
  }
}
