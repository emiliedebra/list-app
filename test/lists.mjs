import { describe, it } from 'mocha';
import { expect } from 'chai';

// model imports
import { List } from '../data-access/index';
// constant imports
import { list, mutatedList } from './constants';

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
    List
      .addList(list)
      .then((result) => {
        mutatedList._id = result._id;
        List.updateList(mutatedList)
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

  it('gets the checked items', (done) => {
    List
      .addList(list)
      .then((result) => {
        List.getCheckedItems(result._id)
          .then((result2) => {
            expect(result2).to.have.length(0);
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });
  it('gets the unchecked items', (done) => {
    List
      .addList(list)
      .then((result) => {
        List.getUncheckedItems(result._id)
          .then((result2) => {
            expect(result2).to.have.length(2);
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });
  it('checks an item', (done) => {
    List
      .addList(list)
      .then((result) => {
        List.checkItem(result._id, 'Bread')
          .then(() => {
            List.getCheckedItems(result._id)
              .then((result2) => {
                expect(result2).to.have.length(1);
                List.getUncheckedItems(result._id)
                  .then((result3) => {
                    expect(result3).to.have.length(1);
                    done();
                  })
                  .catch(err => done(err));
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });
  it('unchecks an item', (done) => {
    List
      .addList(list)
      .then((result) => {
        List.checkItem(result._id, 'Bread')
          .then(() => {
            List.checkItem(result._id, 'Milk')
              .then(() => {
                List.uncheckItem(result._id, 'Milk')
                  .then(() => {
                    List.getUncheckedItems(result._id)
                      .then((result2) => {
                        expect(result2).to.have.length(1);
                        expect(result2).to.contain('Milk');
                        done();
                      })
                      .catch(err => done(err));
                  })
                  .catch(err => done(err));
              })
              .catch(err => done(err));
          }).catch(err => done(err));
      })
      .catch(err => done(err));
  });
});
