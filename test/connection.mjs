import { beforeEach, before, after } from 'mocha';

import { connect, getCollections, disconnect } from '../db-connection';

before((done) => {
  setUpConnection(done);
});

after((done) => {
  closeConnection(done);
});

// NOTE: Fix this = this is nasty!!!
beforeEach((done) => {
  getCollections()
    .then((coll) => {
      coll.lists.remove({});
      coll.users.remove({});
    })
    .then(() => {
      done();
    })
    .catch(() => {
      console.log('No collections in the database.');
      done();
    });
});

function setUpConnection(done) {
  connect()
    .then(() => {
      console.log('DB got connected');
      done();
    })
    .catch(err => done(err));
}

function closeConnection(done) {
  disconnect()
    .then(() => {
      console.log('All tests complete - connection to db closed.');
      done();
    })
    .catch(err => done(err));
}
