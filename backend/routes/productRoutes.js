const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()


const { getAllProducts, getProductById, buildProduct, deleteProduct, updateProduct } = require('../controller/productControllers')


router.get('/', jsonParser, getAllProducts)

router.get('/:id', jsonParser, getProductById)

router.post('/build', jsonParser, buildProduct)

router.delete('/delete/:id', jsonParser, deleteProduct)

router.put('/update/:id', jsonParser, updateProduct)


module.exports = router