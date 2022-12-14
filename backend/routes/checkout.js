const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
require('dotenv').config();

const { checkoutProd, checkoutInfoForm, stripeWebhook } =  require('../controller/productControllers')
const jsonParser = bodyParser.json()


router.post('/create-checkout-session', jsonParser, checkoutProd)

router.post('/webhook', express.json({verify: (req,res,buf) => { req.rawBody = buf }}), stripeWebhook)





module.exports = router