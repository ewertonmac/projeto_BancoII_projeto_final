require('dotenv').config();

const mongoose = require('mongoose');

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoDB = process.env.MONGO_DB || 'even4';

const atlasURI = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDB}?retryWrites=true&w=majority`;
const localURI = `mongodb://localhost:${mongoPort}/${mongoDB}`;

const connectionURI = mongoUser && mongoPass ? atlasURI : localURI;

try {
    mongoose.connect(connectionURI, { useNewUrlParser: true , useUnifiedTopology: true });

} catch (error) {
    console.log(error.message);
}

module.exports = mongoose;