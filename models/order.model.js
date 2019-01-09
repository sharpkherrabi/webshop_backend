const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const validator = require('validator');
const validate =  require('mongoose-validator');

let zipValidator = [
	validate({
		validator: 'isNumeric',
		passIfEmpty: false
	}),
	validate({
		validator: 'isLength',
		arguments: [5, 5]
	})
]
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
		enum: ['PayPal', 'Credit card', 'Voucher'],
		default: 'PayPal'
	},
	date: {
		type: Date,
		default: Date.now()
	},
	orderer: {
		firstName: {type: String, required: true},
		lastName: {type: String, required: true}        
	},
	email:{
		type: String,
		required: true,
		validate: validator.isEmail
	},
	adress: {
		street : {type: String, required: true},    
		houseNr: {type: String, required: true},
		zip : {type: String, required: true, validate: zipValidator},
		city: {type: String, required: true},
		country: {type: String, required: true}
	},
	price: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Order', orderSchema);

