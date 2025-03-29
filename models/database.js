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

const DB_URI = process.env.MONGODB_URI;

if (!DB_URI) {
  throw new Error('MONGODB_URI undefined');
}

mongoose
  .connect(DB_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;
