import { DB_URL } from '../config';
import mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useNewUrlParser: false });

mongoose.connection.on('connected', () => {
  console.log(`mongoose connection open to ${DB_URL}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(`mongoose disconnect`);
});

export default mongoose;