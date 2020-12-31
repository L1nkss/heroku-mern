import express, { Request, Response } from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

router
    .route('/')
    .post(async (req: Request, res: Response) => {
        const { login, password } = req.body;
        UserSchema.findOne( { login }, (err: any, user: any) => {
            if (err) {
                console.log("Error", err);
                res.status(500)
                    .json({
                        error: 'Internal error please try again'
                    })
            } else if (!user) {
                res.status(401)
                    .json({
                        error: 'Incorrect email or password'
                    })
            } else {
                user.isCorrectPassword(password, function(err: any, same: any) {
                    console.log(same)
                    if (err) {
                        res.status(500)
                            .json({
                                error: 'Internal error please try again'
                            })
                    } else if (!same) {
                        res.status(401)
                            .json({
                                error: 'Incorrect email or password' 
                            })
                    } else {
                        const payload = { login };
                        const token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: '1h'
                        });
                        res.cookie('token', token, { httpOnly: true })
                            .sendStatus(200)
                    }
                })
            }
        })
    });

module.exports = router