import jwt from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../models/userModel';

// Middleware to verify the JWT, if there's no erros, it will req will
// pass through
export const verifyToken = (req, res, next) => {
    const token = req.headers['x-json-web-token'];

    if (!token) {
        res.status(403).send('Unverified, no token provided');
    } else {
        jwt.verify(token, config.secretKey, (error, decoded) => {
            if (error) {
                res.status(500).send('Unverified, failure to verify token');
            } else {
                req.token = token;
                req.decoded = decoded;
                User.findById(decoded.id, { password: 0 }, (error, User) => {
                    if (error) {
                        res.status(500).send(
                            'There was an error finding that user'
                        );
                    } else if (!User) {
                        res.status(404).send('Could not locate that user');
                    } else {
                        next();
                    }
                });
            }
        });
    }
};
