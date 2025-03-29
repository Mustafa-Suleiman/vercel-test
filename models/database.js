// const mongoose = require('mongoose');
// require('dotenv').config();

// const uri = process.env.DB_URL || 'mongodb+srv://mohammad:6616678@cluster1.129qd.mongodb.net';

// if (typeof uri !== 'string' || !uri) {
//   throw new Error('MDB_URI environment variable is not set correctly');
// }

// mongoose.connect(uri)

//   .then(() => console.log('MongoDB connected...'))

//   .catch(err => console.error('MongoDB connection error:', err));


//   module.exports = 'mongodb://localhost:27017/test';


const mongoose = require('mongoose');
require('dotenv').config();

const baseUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!baseUri || !dbName) {
  throw new Error('MONGODB_URI or DB_NAME undefined');
}

const uri = `${baseUri}/${dbName}`;

mongoose
  .connect(uri)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;