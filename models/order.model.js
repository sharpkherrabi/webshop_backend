const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const orderSchema = new Schema({
    product: [{
        id: {
            type: String,
            required: true
        },
        amount : {
            type: Number,
            min: 1,
            required: true
        },        
    }],
    paymentMethod: {
        type: String
        //default: 'paypal'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    orderer: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}        
    },
    adress: {
        street : {type: String, required: true},    
        houseNr: {type: String, required: true},
        zip : {type: Number, required: true},
        city: {type: String, required: true}
    }
});

module.exports = mongoose.model('Order', orderSchema);

