import React from 'react';
import {getGamesSchedules} from '../api';
import moment from 'moment';
import {Link} from 'react-router';
import Firebase from 'firebase';

export default class GameList extends React.Component {

  constructor(context, props) {
    super(context, props);
    this.state = {};
    this.state = {
      games: '',
      code: '',
      name: ''
    };
  }

  componentDidMount() {
    const today = moment().format('YYYY/MM/DD');
    const {query} = this.props.location;
    this.setState({name: query.name});
    getGamesSchedules(today)
    .then((result) => {
      this.setState({games: result});
    });
  }

  handleSelectedGame(eventId) {
    // Get reference to firebase
    const rootRef = new Firebase('https://ballparkfantasy.firebaseio.com');

    // Generate a game code by truncating an auto id to 6 characters
         // Write session to the generated game code
    let names = {};
    names[this.state.name] = true;
    let sessionCode = '';
    while (sessionCode.length === 0 || sessionCode.indexOf('-') >= 0) {
      sessionCode = rootRef.child('session').push().key();
      sessionCode = sessionCode.substring(1, 7).toUpperCase();
    }

    // Write session to the generated game code
    const sessionRef = rootRef.child('session').child(sessionCode);
    const sessionValue = {
      users: names,
      eventId: eventId,
      started: 'false'
    };
    sessionRef.set(sessionValue);

    // Go to the game page
    window.location.hash = 'game?eventId=' + eventId + '&name=' + this.state.name + '&code=' + sessionCode ;
  }

  render() {
    if (!this.state.name) {
      return (
        <h3>Please log in to continue</h3>
      )
    }
    //TODO: this is a temporary fake button; generate game table from API response instead
    //onClick={this.handleSelectedGame.bind(this)}
    return (
      <div>
        <h2>Hello, {this.state.name}!</h2>
        <p>Which game are you watching?</p>
        { this.state.games ?
          this.state.games.getIn(['league', 'games']).map((game) => {
            if (game.get('status') === 'canceled') { return null; }
            return (
                <div onClick={()=>this.handleSelectedGame(game.get('id'))} >
                  <span>{game.getIn(['away', 'name'])}</span>
                  <span> @ </span>
                  <span>{game.getIn(['home', 'name'])},</span>
                  <span> Status: {game.get('status')}</span>
                </div>
              );
          }) : null
        }
      </div>
    );
  }
}
