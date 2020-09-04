import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

// Register user middleware
export const registerUser = (req, res) => {
    // Hash password and create new user
    const hashedPassword = bcrypt.hashSync(req.body.password);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    // Check if this user already exists
    const doesUserExist = User.exists(
        { email: newUser.email },
        (err, result) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        }
    );

    // If user exists, error out
    if (doesUserExist === true) {
        res.status(401).send({ auth: false, message: 'User already exists' });
        return;
    }

    // If this user doesn't exist, save them
    newUser.save((error, User) => {
        // Assign new JWT
        const token = jwt.sign({ id: User._id }, config.secretKey, {
            expiresIn: 86400,
        });

        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send({ auth: true, token });
        }
    });
};

// Middleware to get user
export const getRegisteredUser = (req, res) => {
    const token = req.token;
    const decoded = req.decoded;

    if (!token) {
        res.status(401).send({ auth: false, message: 'Token not provided' });
    } else {
        // Verify token
        jwt.verify(token, config.secretKey, (error, decoded) => {
            if (error) {
                res.status(500).send({
                    auth: false,
                    message: 'Token can not be verified',
                });
            } else {
                // Then find user by ID
                User.findById(decoded.id, { password: 0 }, (error, User) => {
                    if (error) {
                        res.status(500).send(
                            'There was an error finding that user'
                        );
                    } else if (!User) {
                        res.status(404).send('Could not locate that user');
                    } else {
                        res.status(200).send(User);
                    }
                });
            }
        });
    }
};

// Login user middleware
export const loginUser = (req, res) => {
    // Find user by email
    User.findOne({ email: req.body.email }, (error, User) => {
        if (error) {
            res.status(500).send('There was an error with login');
        } else if (!User) {
            res.status(404).send('Sorry, that user does not appear to exist');
        } else {
            // After user is found, check the password
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                User.password
            );

            if (!passwordIsValid) {
                res.status(401).send({ auth: false, token: null });
            } else {
                // If password if valid, issue new JWT
                const token = jwt.sign({ id: User._id }, config.secretKey, {
                    expiresIn: 86400,
                });
                res.status(200).send({ auth: true, token });
            }
        }
    });
};
