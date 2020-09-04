import { Transaction, TransactionTC } from '../models/transactionModel';

const TransactionQuery = {
    transactionById: TransactionTC.getResolver('findById'),
    transactionByIds: TransactionTC.getResolver('findByIds'),
    transactionOne: TransactionTC.getResolver('findOne'),
    transactionMany: TransactionTC.getResolver('findMany'),
    transactionCount: TransactionTC.getResolver('count'),
    transactionConnection: TransactionTC.getResolver('connection'),
    transactionPagination: TransactionTC.getResolver('pagination'),
};

const TransactionMutation = {
    transactionCreateOne: TransactionTC.getResolver('createOne'),
    transactionCreateMany: TransactionTC.getResolver('createMany'),
    transactionUpdateById: TransactionTC.getResolver('updateById'),
    transactionUpdateOne: TransactionTC.getResolver('updateOne'),
    transactionUpdateMany: TransactionTC.getResolver('updateMany'),
    transactionRemoveById: TransactionTC.getResolver('removeById'),
    transactionRemoveOne: TransactionTC.getResolver('removeOne'),
    transactionRemoveMany: TransactionTC.getResolver('removeMany'),
};

export { TransactionQuery, TransactionMutation };
