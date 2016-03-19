import request from 'superagent';
import {fromJS, Iterable} from 'immutable';

const timeout = 5000;  // 5 seconds

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
  if (Iterable.isIterable(query)) {
    return query.toJS();
  } else {
    return query || {};
  }
}

export function getToApi(path, query) {
  return new Promise((resolve, reject) => {
    request
    .get(path)
    .query(handleImmutableQuery(query))
    .timeout(timeout)
    .end(handleCall(resolve, reject));
  });
}

export function postToApi(path, query) {
  return new Promise((resolve, reject) => {
    request
    .post(path)
    .query(handleImmutableQuery(query))
    .timeout(timeout)
    .end(handleCall(resolve, reject));
  });
}
