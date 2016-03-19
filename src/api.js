import request from 'superagent';
import {fromJS, Iterable} from 'immutable';
import {sportRadar} from '../apikeys.json';

const timeout = 5000;  // 5 seconds
//const corsBS = 'https://crossorigin.me/';
const corsBS = 'http://localhost:8080/';
const sportRadarPath = `${corsBS}http://api.sportradar.us/mlb-t5`;

function handleCall(resolve, reject) {
  return function (err, res) {
    if (res.status === 200 && !err) {
      return resolve(fromJS(JSON.parse(res.text)));
    } else {
      console.log(err.response);
      return reject(fromJS(JSON.parse(err.response.text)));
    }
  };
}

function handleImmutableQuery(query) {
  console.log('querry!!!', query);
  if (Iterable.isIterable(query)) {
    return query.toJS();
  } else {
    return query || {};
  }
}

export function get(path, query) {
  return new Promise((resolve, reject) => {
    request
    .get(path)
    .query(handleImmutableQuery(query))
    .timeout(timeout)
    .end(handleCall(resolve, reject));
  });
}

export function post(path, query) {
  return new Promise((resolve, reject) => {
    request
    .post(path)
    .query(handleImmutableQuery(query))
    .timeout(timeout)
    .end(handleCall(resolve, reject));
  });
}


//http://api.sportradar.us/mlb-t5/games/2016/3/19/schedule.json?api_key=key

export function getGamesSchedules(date) {
  const path = `${sportRadarPath}/games/${date}/schedule.json?api_key=${sportRadar.apiKey}`;
  return get(path);
}
