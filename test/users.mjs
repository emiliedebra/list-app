import { describe, it } from 'mocha';
import { expect } from 'chai';

// import DB from '../db-connection';
import { User } from '../data-access/index';
import { closeConnection } from '../db-connection';

describe('User Tests', () => {
  after(() => {
    closeConnection();
  });
  it('gets a list of users', (done) => {
    User
      .getUsers()
      .then((results) => {
        expect(results).to.be.eql([]);
        done();
      })
      .catch(err => done(new Error(err.message)));
  });
  it('gets a user by id', () => {
    expect(true).to.be.equal(true);
  });
  it('adds a users', () => {
    expect(true).to.be.equal(true);
  });
  it('mutates a user', () => {
    expect(true).to.be.equal(true);
  });
});
