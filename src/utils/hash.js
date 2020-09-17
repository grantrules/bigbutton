const bcrypt = require('bcrypt');

const hash = (password) => new Promise((resolve, reject) => bcrypt.hash(password, 10, (err, hash) => err && reject(err) || resolve(hash)));

const compare = (password, hash) => new Promise((resolve, reject) => bcrypt.compare(password, hash, (err, hash) => err && reject(err) || resolve(hash)));

module.exports = { hash, compare };
