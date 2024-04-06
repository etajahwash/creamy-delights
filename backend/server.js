require("dotenv").config();
const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const checkoutProduct = require('./routes/checkout')
const checkingout = require('./routes/checkingout')
const register = require('./routes/register')
const login = require('./routes/login')

connectDB();

const app = express()

// middlewares 
// app.use(express.json({verify: (req,res,buf) => { req.rawBody = buf }}));
app.use(cors())
app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/products', productRoutes)
app.use('/api/checkout', checkoutProduct)
app.use('/api/checkingout', checkingout)

const PORT = process.env.REACT_APP_PORT || 5000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!!`)
})
