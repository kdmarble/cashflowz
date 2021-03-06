import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

// Mongoose connection config
const connection = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
});

mongoose.set('useCreateIndex', true);

connection
    .then((db) => db)
    .catch((err) => {
        console.log(err);
    });

export default connection;
