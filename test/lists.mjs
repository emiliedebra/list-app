import { describe, it } from 'mocha';
import { expect } from 'chai';

import { List } from '../data-access/index';

describe('List Tests', () => {
  it('gets an array of lists', (done) => {
    List
      .getLists()
      .then((results) => {
        expect(results).to.be.eql([]);
        done();
      })
      .catch(err => done(new Error(err.message)));
  });
  it('adds a list', (done) => {
    const list = {
      name: 'Shopping',
      unchecked_items: [
        'Bread',
        'Milk',
      ],
    };
    List
      .addList(list)
      .then((results) => {
        // console.log(results);
        expect(results.name).to.be.eql('Shopping');
        expect(results.checked_items).not.to.be.equal([]);
        expect(results.unchecked_items).not.to.be.equal([]);
        done();
      })
      .catch(err => done(new Error(err.message)));
  });
  it('gets a list by id', (done) => {
    const list = {
      name: 'Shopping',
      unchecked_items: [
        'Bread',
        'Milk',
      ],
    };
    List
      .addList(list)
      .then((result) => {
        List.getList(result._id)
          .then((result2) => {
            expect(result2.name).to.be.eql('Shopping');
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('mutates a list', (done) => {
    const list = {
      name: 'Shopping',
      unchecked_items: [
        'Bread',
        'Milk',
      ],
    };
    const mutated = {
      name: 'Shopping',
      unchecked_items: [
        'Bread',
        'Milk',
        'Cheese',
      ],
    };
    List
      .addList(list)
      .then((result) => {
        mutated._id = result._id;
        List.updateList(mutated)
          .then(() => {
            List
              .getList(result._id)
              .then((result2) => {
                expect(result2.name).to.be.eql('Shopping');
                expect(result2.unchecked_items).to.have.length(3);
                done();
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('removes a list', (done) => {
    const list = {
      name: 'Shopping',
      unchecked_items: [
        'Bread',
        'Milk',
      ],
    };
    List
      .addList(list)
      .then((result) => {
        List
          .removeList(result._id)
          .then(() => {
            List
              .getLists()
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
