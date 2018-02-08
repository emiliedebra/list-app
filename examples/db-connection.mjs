import { getConnection } from '../db-connection';

getConnection()
  .then(({ db, client }) => { console.log('conn1', db); client.close(); })
  .then(() => {
    getConnection()
      .then(({ db, client }) => { console.log('conn2', db); client.close(); })
      .catch(console.log);
  })
  .catch(console.log);
