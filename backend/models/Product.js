const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    flavor: {
        type: String,
        required: true
    },
    toppings: {
        type: String,
        lowercase: true,
        enum: ['sprinkles', 'double scoop', 'maraschino cherries', 'cake', 'caramel sauce',
            'whipped cream', 'strawberry sauce', 'crushed oreos', 'banana slices',
            'chili oil', 'hot fudge', 'raspberries', "s'mores", 'blueberries', 'pretzels', 'almonds'],
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    matchId: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;