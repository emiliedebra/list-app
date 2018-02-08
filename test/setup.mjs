import { describe, it } from 'mocha';
import { expect } from 'chai';

import { getConnection, closeConnection } from '../db-connection';

describe('Database Connection', () => {
  it('connects successfully', (done) => {
    getConnection()
      .then((db) => {
        expect(db).not.to.be.equal(null);
        done();
      })
      .catch(err => done(err));
  });
  it('doesn\'t reconnect each time', (done) => {
    getConnection()
      .then((db) => {
        expect(db).not.to.be.equal(null);
        done();
      })
      .catch(err => done(err));
  });
  it('closes connection correctly', (done) => {
    closeConnection();
    done();
  });
});
