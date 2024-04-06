const Product = require('../models/Product');
const Joi = require('joi');
const genAuthToken = require('../utils/genAuthToken')
require('dotenv').config();
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.REACT_APP_STRIPE_KEY)


// GET ALL PRODUCT
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
}






// GET PRODUCT BY ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
}






// BUILD PRODUCT
const buildProduct = async (req, res) => {

    // schema for validating data via joi, data validation check
    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required(),
        price: Joi.number().required(),
        flavor: Joi.string().required(),
        description: Joi.string(),
        toppings: Joi.string().lowercase().required().valid('sprinkles', 'double scoop', 'maraschino cherries', 'cake', 'caramel sauce',
        'whipped cream', 'strawberry sauce', 'crushed oreos', 'banana slices',
        'chili oil', 'hot fudge', 'raspberries', "s'mores", 'blueberries', 'pretzels', 'almonds'),
        imgUrl: Joi.string().required(),
        matchId: Joi.string().required(),
    })

    // part of joi syntax to validate value against the defined schema
    // this checks for errors
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(`${error.details[0].message}`)

    // checks if unique property (name, in this case) already exists. if so, error will appear
    let build = await Product.findOne({name: req.body.name})
    if (build) return res.status(400).send('Ice cream name already exists.')

    // if data is checked and no error occurs then information is new. will utilize model so info can be saved to db 
    build = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        flavor: req.body.flavor,
        toppings: req.body.toppings,
        matchId: req.body.matchId
    })

    build = await build.save()
    // const token = genAuthToken(build);
    // res.send(token)
}






// UPDATE PRODUCT
const updateProduct = async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required(),
        price: Joi.number().required(),
        flavor: Joi.string().required(),
        description: Joi.string(),
        toppings: Joi.string().lowercase().required().valid('sprinkles', 'double scoop', 'maraschino cherries', 'cake', 'caramel sauce',
        'whipped cream', 'strawberry sauce', 'crushed oreos', 'banana slices',
        'chili oil', 'hot fudge', 'raspberries', "s'mores", 'blueberries', 'pretzels', 'almonds'),
        imgUrl: Joi.string().required(),
        matchId: Joi.string().required(),
    })

    // part of joi syntax to validate value against the defined schema
    // this checks for errors
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(`${error.details[0].message}`)

    // checks if unique property (name, in this case) already exists. if so, error will appear
    let updatedItem = await Product.findOne({name: req.body.name})
    if (updatedItem) return res.status(400).send('Ice cream name already exists.')

    const { id } = req.params;
 
    updatedItem = {
        name: req.body.name,
        flavor: req.body.flavor,
        toppings: req.body.toppings,
        description: req.body.description
    };

    Product.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: updatedItem },
        function (req, res, err) {
            if (!err) {
                console.log('backend item updated!');
            } else {
                console.log(err);
            }
        }
    )
} 






// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await Product.findByIdAndDelete(id)
        res.json(deletedPost);     
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})}    
}





// STRIPE CHECKOUT
const checkoutProd = async (req, res) => {
    // let cartItems = [];


    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            orderId: req.body.data,
        }
    })

    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: { 
                currency: 'usd',
                product_data: {
                  name: item.name,
                  images: [item.imgUrl],
                  description: item.description,
                  metadata: {
                    id: item.id
                  }
                },
                unit_amount: item.price * 100,
              },
              quantity: item.cartQuantity,  
        }
    })

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: `${process.env.REACT_APP_CLIENT_URL}/completeOrder`,
      cancel_url:  `${process.env.REACT_APP_CLIENT_URL}/checkout`,
    });
  
    res.send({url: session.url});
  };





//   WEBHOOK
let endpointSecret;

const stripeWebhook = (req, res) => {

    const sig = req.headers['stripe-signature'];

    let data;
    let eventType;

    if(endpointSecret) {
  
        let event;
  
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
          console.log('Webhook verified')
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`)
          res.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }

        data = event.data.object;
        eventType = event.type
        } else {
        data = req.body.data.object;
        eventType = req.body.type
    }

  
    // Handle the event

    if(eventType === 'checkout.session.completed') {
        stripe.customers.retrieve(data.customer).then((customer) => {
            console.log(customer); 
            console.log('data:', data)       
        })
        .catch((err) => console.log(err.message))
    }

  
    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }




module.exports = {
    getAllProducts,
    getProductById,
    buildProduct,
    deleteProduct,
    updateProduct,
    checkoutProd,
    stripeWebhook
}
