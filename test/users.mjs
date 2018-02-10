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
      .catch(err => done(err));
  });

  it('gets a user by id', (done) => {
    const user = {
      name: 'Emilie Wood',
      email: 'emilie@anotherway.co.za',
    };
    let id;
    User
      .addUser(user)
      .then((results) => {
        id = results._id;
      })
      .then(() => {
        User
          .getUser(id)
          .then((result) => {
            expect(result.name).to.be.eql('Emilie Wood');
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('mutates a user', (done) => {
    const user = {
      name: 'Emilie Wood',
      email: 'emilie@anotherway.co.za',
    };
    const updatedUser = {
      _id: 0,
      name: 'Caitlin Wood',
      email: 'emilie@anotherway.co.za',
    };
    User
      .addUser(user)
      .then((results) => {
        updatedUser._id = results._id;
      })
      .then(() => {
        User
          .updateUser(updatedUser)
          .then((result) => {
            expect(result.name).to.be.eql('Emilie Wood');
          })
          .then(() => {
            User
              .getUser(updatedUser._id)
              .then((update) => {
                expect(update.name).to.be.eql('Caitlin Wood');
                done();
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('gets a user by list_id', (done) => {
    const user = {
      name: 'Emilie Wood',
      email: 'emilie@anotherway.co.za',
      list_id: [
        1,
        2,
      ],
    };
    User
      .addUser(user)
      .then(() => {
        User
          .getUsersByListId(1)
          .then((result) => {
            expect(result[0].name).to.be.eql('Emilie Wood');
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('gets an array of users by list_id', (done) => {
    const user = {
      name: 'Emilie Wood',
      email: 'emilie@anotherway.co.za',
      list_id: [
        1,
        2,
      ],
    };
    const user2 = {
      name: 'Caitlin Wood',
      email: 'cait@anotherway.co.za',
      list_id: [
        1,
      ],
    };
    User
      .addUser(user)
      .then(() => {
        User
          .addUser(user2)
          .then(() => {
            User
              .getUsersByListId(1)
              .then((result) => {
                expect(result.length).to.be.eql(2);
                expect(result[0].name).to.be.eql('Emilie Wood');
                expect(result[1].name).to.be.eql('Caitlin Wood');
                done();
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('returns [] if no users with list_id', (done) => {
    User
      .getUsersByListId(1)
      .then((result) => {
        expect(result).to.be.eql([]);
        done();
      })
      .catch(err => done(err));
  });

  it('removes a user', (done) => {
    const user = {
      name: 'Emilie Wood',
    };
    User
      .addUser(user)
      .then((result) => {
        User
          .removeUser(result._id)
          .then(() => {
            User
              .getUsers()
              .then((result2) => {
                expect(result2).to.be.eql([]);
                done();
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });
});
