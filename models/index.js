const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
// db.tutorials = require('./tutorial.model.js')(mongoose);
db.simulacra = require('./simulacra.js')(mongoose);
// db.weapon = require('./weapon.js')(mongoose);

module.exports = db;
