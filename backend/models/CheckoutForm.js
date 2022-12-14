const mongoose = require('mongoose');

const checkoutFormSchema = new mongoose.Schema({

    cardNumber: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    cvv: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    matchId: {
        type: String,
        required: true
    }

})

const CheckoutForm = mongoose.model('CheckoutForm', checkoutFormSchema);

module.exports = CheckoutForm;