import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({ error: 'Please pass both username and password.' });
    } else {

        // Create and save the new user
        let newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        newUser.save(function (err) {
            if (err) {
                return res.json({ error: 'Username already exists.' });
            }
            res.json({error: 'Successful created new user.' });
        });
    }
};

export const login = async (req, res) => {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ error: 'Authentication failed. User not found.' });
        } else {
            
            // Check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (!err && isMatch) {

                    // Create a JWT token when verified and return it
                    let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
                    res.json({ token });
                } else {
                    res.status(401).send({ error: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
};