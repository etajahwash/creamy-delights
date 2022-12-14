const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const User = require('../models/User');
const genAuthToken = require('../utils/genAuthToken');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()


const router = express.Router();

router.post('/', jsonParser, async(req, res) => {
    // schema for validating data via joi, performs check
    const schema = Joi.object({
        name: Joi.string().min(3).max(13).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(8).max(200).required(),
    });

    // if error occurs while checking data
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // no error occurs but after checking data, user already exists
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already exists.')

    // if data is checked and no error occurs then user is new. will utilize model so info can be saved to db 
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    // before data is saved to db, password is salted then hashed so plaintext is turned into unintelligible numbers and letters. offers password security to users 
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    // new user data saved to db 
    user = await user.save()

    // token generated for user 
    const token = genAuthToken(user)

    // token is sent to Ui/Client (frontend) 
    res.send(token)
});

module.exports = router;