import { SchemaComposer } from "graphql-compose";
import db from "../config/db";

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from "./user";
import { TransactionQuery, TransactionMutation } from "./transaction";

schemaComposer.Query.addFields({
  ...UserQuery,
  ...TransactionQuery
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...TransactionMutation
});

export default schemaComposer.buildSchema();
