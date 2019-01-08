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
        _id: false   //to not create _id field for each product     
    }],
    paymentMethod: {
        type: String,
        enum: ['Paypal', 'Credit card', 'Voucher'],
        default: 'Paypal'
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
    },
    price: {
        type: Number,
        required: true
    }
});

orderSchema.methods.setPrice = function (price) {
    console.log('orderModel ' + price);
	this.set('price', 1000);
};


module.exports = mongoose.model('Order', orderSchema);

