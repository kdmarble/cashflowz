import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { routes } from './routes/routes';

import './config/db';
import schema from './schema';

dotenv.config();

// Init express
const app = express();

// Init Apollo Server
const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/',
});

// Pass express app as Apollo middleware
server.applyMiddleware({
    app,
    path: '/graphql',
    cors: true,
    onHealthCheck: () =>
        // eslint-disable-next-line no-undef
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        }),
});

app.use(express.json());

// Pass express app to router funtion
routes(app);

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 8080!');
});
