import React from 'react';
import {getGamesSchedules} from '../api';
import moment from 'moment';
import {Link} from 'react-router';
import Firebase from 'firebase';

export default class GameList extends React.Component {

  constructor(context, props) {
    super(context, props);
    let { query } = this.props.location;
      this.state = {};
    this.state = {games: '', code: '', name: query.name};
  }

  componentDidMount() {
    const today = moment().format('YYYY/MM/DD');
    getGamesSchedules(today)
    .then((result) => {
      this.setState({games: result});
    });
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
    var sessionValue = { 'users' : [this.state.name],
                         'eventId': eventId,
                         'started': 'false'};
    sessionRef.set(sessionValue);

    // Go to the game page
    window.location.hash = 'game?eventId=' + eventId + '&name=' + this.state.name;
    e.preventDefault();
  }

  render() {
    //TODO: this is a temporary fake button; generate game table from API response instead
    //onClick={this.handleSelectedGame.bind(this)}
    return (
      <div>
        <h2>Hello, {this.state.name}!</h2>
        <p>Which game are you watching?</p>
        { this.state.games ?
          this.state.games.getIn(['league', 'games']).map((game) => {
            return (
              <div>

                <Link to='/game?tobeadded=true'>
                  <span>{game.getIn(['away', 'name'])}</span>
                  <span> @ </span>
                  <span>{game.getIn(['home', 'name'])},</span>
                  <span> Status: {game.get('status')}</span>
                </Link>
              </div>
            );
          }) : null
        }
      </div>
    );
  }
}
