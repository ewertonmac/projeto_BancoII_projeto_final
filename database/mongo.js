require('dotenv').config();

const mongoose = require('mongoose');

const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoUser = process.env.MONGO_USER || '';
const mongoPass = process.env.MONGO_PASS || '';
const mongoDB = process.env.MONGO_DB || 'even4';

const atlasURI = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDB}`;
const localURI = `mongodb://${mongoHost}:${mongoPort}/${mongoDB}`;

const connectionURI = mongoUser && mongoPass ? atlasURI : localURI;

mongoose.connect(connectionURI, { useNewUrlParser: true });

module.exports = mongoose;