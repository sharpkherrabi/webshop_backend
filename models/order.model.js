/* Package imports */
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
];

/** Schemas for adress, orderer and product to make validators run on update
 * https://mongoosejs.com/docs/validation.html
 */
const adressSchema =  new Schema({
	street : {type: String, required: true},    
	houseNr: {type: String, required: true},
	zip : {type: String, required: true, validate: zipValidator},
	city: {type: String, required: true},
	country: {type: String, required: true},
	_id: false //to not create _id field for each adress
});

const ordererSchema = new Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	_id: false 
});

const productSchema =  new Schema({
	id: {type: String, required: true},
	amount : {type: Number, min: 1, required: true},
	_id: false //to not create _id field for each product
});

const orderSchema = new Schema({
	product: [{
		type: productSchema,
		required: true,     
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
		type: ordererSchema,
		required: true   
	},
	email:{
		type: String,
		required: true,
		validate: validator.isEmail
	},
	adress: {
		type: adressSchema,
		required: true	
	},
	price: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Order', orderSchema);

