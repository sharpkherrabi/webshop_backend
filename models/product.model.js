const mongoose = require('mongoose');
const { Schema } = mongoose;
//const validator = require('validator');
const mongoose_csv = require('mongoose-csv');

let productSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String
		/*validate: (value) => {
            return validator.matches(value, /^[a-z0-9 ]+$/i);;
        }*/
	},
	quantity: {
		type: Number,
		required: true,
		validate: (value) => {
			return parseInt(value) >= 0;
		}
	},
	mass: {
		type: Number,
		validate: (value) => {
			return parseFloat(value) >= 0;
		}
	},
	unitPrice: {
		type: Number,
		required: true,
		validate: (value) => {
			return parseInt(value) > 0;
		}
	},
	image: {
		type: String,
		csv: false
	}
});

productSchema.methods.updateQuantity = function (quantity) {
	let priorQuantity = this.get('quantity', Number);
	this.set('quantity', priorQuantity + quantity);
};

productSchema.plugin(mongoose_csv);

module.exports = mongoose.model('Product', productSchema);