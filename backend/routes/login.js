const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const User = require('../models/User');
const genAuthToken = require('../utils/genAuthToken');
const { db } = require('../models/User');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()


const router = express.Router();

router.post('/', jsonParser, async(req, res) => {
        // perform check of data coming 
        const schema = Joi.object({
            email: Joi.string().min(3).max(200).required().email(),
            password: Joi.string().min(8).max(200).required(),
        });
    
        // if error occurs while checking data
        const { error } = schema.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

    // no error occurs during data check, finding user
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('User does not exist.');

    // using bcrypt to compare if password entered matches password in db 
    const isValid = await bcrypt.compare(req.body.password, user.password);
    // if password is false (i.e. opposite of boolean variable, given error message) 
    if (!isValid) return res.status(400).send('Invalid email or password.');

    // token generated for user 
    const token = genAuthToken(user)

    // token is sent to Ui/Client (frontend) 
    res.send(token)

})

module.exports = router;