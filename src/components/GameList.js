import React from 'react';
import {getGamesSchedules} from '../api';
import moment from 'moment';
import {Link} from 'react-router';

export default class GameList extends React.Component {

  constructor(context, props) {
    super(context, props);
    this.state = {games: '', code: ''};
  }

  componentDidMount() {
    const today = moment().format('YYYY/MM/DD');
    getGamesSchedules(today)
    .then((result) => {
      this.setState({games: result});
    });
  }

  goToPage(e) {
    const element = e.target;
    const pageName = element.name;
    window.location.hash = `${pageName}?test=test`;
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Games Today</h2>
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
