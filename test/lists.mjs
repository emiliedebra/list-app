import { describe, it } from 'mocha';
import { expect } from 'chai';

import List from '../data-access/lists';

describe('List Tests', () => {
  it('gets a list of users', (done) => {
    List
      .getLists()
      .then((results) => {
        expect(results).to.be.eql([]);
        done();
      })
      .catch(err => done(new Error(err.message)));
  });
  it('gets a list by id', () => {
    expect(true).to.be.equal(false);
  });
  it('adds a list', (done) => {
    const list = {
    };
    List
      .addList(list)
      .then((results) => {
        // console.log(results);
        expect(list).to.be.eql(results); // gimicky - change
        done();
      })
      .catch(err => done(new Error(err.message)));
  });
  it('mutates a list', () => {
    expect(true).to.be.equal(false);
  });
});
