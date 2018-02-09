import { describe, it } from 'mocha';
import { expect } from 'chai';

import { User } from '../data-access/index';

describe('User Tests', () => {
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
    expect(true).to.be.equal(false);
  });
  it('adds a user', (done) => {
    const user = {
      name: 'Emilie Wood',
      email: 'emilie@anotherway.co.za',
    };
    User
      .addUser(user)
      .then((results) => {
        // console.log(results);
        expect(results.name).to.be.eql('Emilie Wood');
        expect(results.email).to.be.eql('emilie@anotherway.co.za');
        done();
      })
      .catch(err => done(new Error(err.message)));
  });
  it('mutates a user', () => {
    expect(true).to.be.equal(false);
  });
});
