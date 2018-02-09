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
      if (coll.users) {
        // console.log('Got Users');
        coll.users.remove({})
          .then(() => {
            // console.log('Removed Users.');
            if (coll.lists) {
              // console.log('Got Lists');
              coll.lists.remove({})
                .then(() => {
                  // console.log('Removed Lists.');
                  done();
                })
                .catch(err => done(err));
            } else {
              done();
            }
          })
          .catch(err => done(err));
      }
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
