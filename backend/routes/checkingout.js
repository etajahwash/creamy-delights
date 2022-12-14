const bcrypt = require('bcrypt');
const Joi = require('joi');
const bodyParser = require('body-parser')
const express = require('express');
const CheckoutForm = require('../models/CheckoutForm')
const genAuthToken = require('../utils/genAuthToken');

const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.post('/info', jsonParser, async(req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        cardNumber: Joi.number().min(16).required(),
        cvv: Joi.number().min(3).required(),
        month: Joi.number().min(2).required(),
        year: Joi.number().min(2).required(),
        matchId: Joi.string().required(),
    })

    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(`${error.details[0].message}`)

    checkingout = new CheckoutForm({
        name: req.body.name,
        cardNumber: req.body.cardNumber,
        cvv: req.body.cvv,
        month: req.body.month,
        year: req.body.year,
        matchId: req.body.matchId
    });

    checkingout = await checkingout.save()
})

module.exports = router;