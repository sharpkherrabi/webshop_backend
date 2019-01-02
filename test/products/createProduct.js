/** Package imports */
const chai = require('chai');
const chaiHttp = require('chai-http');
const _ = require('lodash');
const chaiExclude = require('chai-exclude');

const should = chai.should();

/** File imports */
const server = require('../../app');
const productModel = require('../../models/product.model');

/** Chai plugins */
chai.use(chaiHttp);
chai.use(chaiExclude);
/** Tests */

describe('create new product (http Post)', () => {
	before((done) => {
		productModel.remove({}, (err) => {
			done();
		});
	});

	after((done) => {
		productModel.remove({}, (err) => {
			done();
		});
	});

	const product = {
			name: 'Mercedes-Benz C63 AMG',
			description: 'the most innovative car in the world',
			quantity: 5,
			mass: 10000000,
			unitPrice: 95000
		},
		duplicate = {
			name: 'Mercedes-Benz C63 AMG',
			description: 'the most powerfull cat in the world',
			quantity: 7,
			mass: 9900000,
			unitPrice: 98000
		};

	it('should create a new product', (done) => {
		chai.request(server)
			.post('/product/create')
			.send(product)
			.end((err, res) => {
				should.not.exist(err);
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql('PRODUCT CREATED SUCCESSFULLY');
				res.body.should.have.property('product').excluding(['_id', '__v']).eql(product);
				done();
			});
	});

	it('should update a product that already exists', (done) => {
		chai.request(server)
			.post('/product/create')
			.send(duplicate)
			.end((err, res) => {
				should.not.exist(err);
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql('PRODUCT UPDATED SUCCESSFULLY');
				res.body.product.quantity.should.be.equal(product.quantity + duplicate.quantity);
				res.body.should.have.property('product').excluding(['_id', '__v', 'quantity']).eql(_.omit(duplicate, 'quantity'));
				done();
			});
	});
});