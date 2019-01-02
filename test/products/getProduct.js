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
describe('get already created products (http get)', () => {
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

	const dummyProduct = {
		name: 'Mercedes-AMG S63 AMG',
		description: 'the most comfortable car in the world',
		quantity: 2,
		mass: 4320000,
		unitPrice: 450000
	};

	it('should get an empty products array', (done) => {
		chai.request(server)
			.get('/product/get')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('products').eql([]);
				done();
			});
	});

	it('should add a new product to the db and test if it\'s properly returned', (done) => {
		chai.request(server)
			.post('/product/create')
			.send(dummyProduct)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.have.property('product').excluding(['_id', '__v']).eql(dummyProduct);
				chai.request(server)
					.get(`/product/get/${res.body.product._id}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.have.property('status').equal('OK');
						res.body.should.have.property('products').be.a('array');
						should.equal(res.body.products.length, 1);
						res.body.products[0].should.be.a('object');
						chai.expect(res.body.products[0]).excluding(['_id', '__v']).eql(dummyProduct);
						done();
					});
			});
	});
});