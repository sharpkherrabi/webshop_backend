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
describe('test search function', () => {
	// mocked products
	const product1 = {
			name: 'Logitech MX-700',
			description: 'wireless keyboard',
			quantity: 3,
			unitPrice: 300
		}, product2 = {
			name: 'Apple Magic Mouse 2',
			description: 'wireless mouse',
			quantity: 2,
			unitPrice: 200
		}, product3 = {
			name: 'Apple Magic Keyboard',
			description: 'wireless keyboard',
			quantity: 1,
			unitPrice: 260
		}, product4 = {
			name: 'Samsung dx-200',
			description: 'more than 700 keys!',
			quantity: 2,
			unitPrice: 400
		},
		//create an array with all the products
		productArray = _.concat([], product1, product2, product3, product4);

	before((done) => {
		productModel.remove({}, () => {
			done();
		});

		//insert the mocked products
		productModel.insertMany(productArray, function (err) {
			if (err) {
				should.fail('failing', 'not failing', 'Problem with insertion into the DB');
			}
		});

	});
	
	after((done) => {
		productModel.remove({}, () => {
			done();
		});
	});

	//test suites
	it('should look for the keyword "apple" in the name field', (done) => {
		let products = [];
		chai.request(server)
			.get('/product/search?name=apple')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('status').equal('OK');
				res.body.should.have.property('products').be.a('array');
				should.equal(res.body.products.length, 2);
				//delete keys: '_id', '__v'
				_.each(res.body.products, (value) => {
					products.push(_.omit(value, ['_id', '__v']));
				});
				chai.expect(products).to.deep.include(product2);
				chai.expect(products).to.deep.include(product3);
				done();
			});
	});
	it('should look for the keyword "keyboard" in the description field', (done) => {
		let products = [];
		chai.request(server)
			.get('/product/search?desc=keyboard')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('status').equal('OK');
				res.body.should.have.property('products').be.a('array');
				should.equal(res.body.products.length, 2);
				//delete keys: '_id', '__v'
				_.each(res.body.products, (value) => {
					products.push(_.omit(value, ['_id', '__v']));
				});
				chai.expect(products).to.deep.include(product1);
				chai.expect(products).to.deep.include(product3);
				done();
			});
	});
	it('should look for the keyword "700" in name and description field', (done) => {
		let products = [];
		chai.request(server)
			.get('/product/search?q=700')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('status').equal('OK');
				res.body.should.have.property('products').be.a('array');
				should.equal(res.body.products.length, 2);
				//delete keys: '_id', '__v'
				_.each(res.body.products, (value) => {
					products.push(_.omit(value, ['_id', '__v']));
				});
				chai.expect(products).to.deep.include(product1);
				chai.expect(products).to.deep.include(product4);
				done();
			});
	});

});