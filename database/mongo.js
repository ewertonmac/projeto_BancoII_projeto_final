require('dotenv').config();

const mongoose = require('mongoose');

<<<<<<< HEAD
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27018';
const mongoUser = process.env.MONGO_USER || '';
const mongoPass = process.env.MONGO_PASS || '';
=======
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
>>>>>>> 2f35c7b0bc3eecbb3bf0d1ce1c1d9b59e51b262d
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