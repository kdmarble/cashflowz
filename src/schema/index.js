import { SchemaComposer } from 'graphql-compose';
import db from '../config/db';

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { TransactionQuery, TransactionMutation } from './transaction';

// Adds User and Transaction queries to graphql schema
schemaComposer.Query.addFields({
    ...UserQuery,
    ...TransactionQuery,
});

// Adds User and Transaction mutations to graphql schema
schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...TransactionMutation,
});

export default schemaComposer.buildSchema();
