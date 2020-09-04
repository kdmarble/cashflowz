import {
    registerUser,
    getRegisteredUser,
    loginUser,
} from '../services/authController';
import { verifyToken } from '../services/verifyToken';
import {
    addTransaction,
    getTransactions,
} from '../services/transactionControllers';

export const routes = app => {
    // Home route, sends OK status
    app.route('/').get((req, res) => {
        res.sendStatus(200);
    });

    // User auth route, registers users
    app.route('/register')
        .post(registerUser)
        .get(verifyToken, getRegisteredUser);

    // Login route, issues new JWT
    app.route('/login').post(loginUser);

    // Transaction route, where you can add/get transactions
    app.route('/transactions')
        .post(verifyToken, addTransaction)
        .get(verifyToken, getTransactions);
};
