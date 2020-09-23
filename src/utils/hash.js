const bcrypt = require('bcrypt');

const hash = (password) => new Promise(
  (resolve, reject) => bcrypt.hash(password, 10,
    (err, result) => (err ? reject(err) : resolve(result))),
);

const compare = (password, hashToCompare) => new Promise(
  (resolve, reject) => bcrypt.compare(password, hashToCompare,
    (err, result) => (err ? reject(err) : resolve(result))),
);

module.exports = { hash, compare };
