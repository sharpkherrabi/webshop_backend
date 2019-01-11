/** Package imports */
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

/** File imports */
const app = require('../../app');
const productModel = require('../../models/product.model');

/** Chai plugins */
chai.use(chaiHttp);

/** Tests */
describe('Order tests', () => {
	beforeEach((done) => {
		productModel.deleteMany({}, () => {
			done();
		});
	});

	const product = {
		name: 'Lichetrkette 3D Stern',
		description: '3D LED 9er Sternenkette für innen & außen',
		unitPrice: '9990',
		quantity: '20',
		image: 'https://images-na.ssl-images-amazon.com/images/I/81CB1CPtWOL._SL1500_.jpg'
	};

	describe('/Update order', () => {
		it('should not update adress, because "street" is not provided', (done) => {
			chai.request(app)
				.post('/product/create')
				.send(product)
				.end((err, res) => {
					should.exist(res.body);
					res.body.should.have.property('product');
					const newOrder = {
						product: [
							{
								id: res.body.product._id,
								quantity: 2
							}
						],
						orderer: {
							firstname: 'Krista',
							lastname: 'Faul'
						},
						adress: {
							street: 'Rheinallee',
							houseNr: '12b',
							zip: '12345',
							city: 'Frankfurt',
							country: 'Germany'
						},
						email: 'hallo@gmail.com'
					};
					chai.request(app)
						.post('/order/create')
						.send(newOrder)
						.end((err, result) => {
							result.should.have.status(201);
							chai.request(app)
								.put(`/order/update/${result.body.order._id}`)
								.send({
									'adress': {
										'houseNr': '12b',
										'zip': '12245',
										'city': 'Frankfurt',
										'country': 'Deutchland'
									}
								})
								.end((err, updateRes) => {
									should.exist(updateRes.body);
									updateRes.should.have.status(500);
									done();
								});

						});
				});
		});

		it('should not update adress, because "zip" validation fails', (done) => {
			chai.request(app)
				.post('/product/create')
				.send(product)
				.end((err, res) => {
					should.exist(res.body);
					res.body.should.have.property('product');
					const newOrder = {
						product: [
							{
								id: res.body.product._id,
								quantity: 2
							}
						],
						orderer: {
							firstname: 'Krista',
							lastname: 'Faul'
						},
						adress: {
							street: 'Rheinallee',
							houseNr: '12b',
							zip: '12345',
							city: 'Frankfurt',
							country: 'Germany'
						},
						email: 'hallo@gmail.com'
					};
					chai.request(app)
						.post('/order/create')
						.send(newOrder)
						.end((err, result) => {
							result.should.have.status(201);
							chai.request(app)
								.put(`/order/update/${result.body.order._id}`)
								.send({
									'adress': {
										'street': 'Palmengarten',
										'houseNr': '12b',
										'zip': '122b45',
										'city': 'Frankfurt',
										'country': 'Deutchland'
									}
								})
								.end((err, updateRes) => {
									should.exist(updateRes.body);
									updateRes.should.have.status(500);
									done();
								});

						});
				});
		});

		it('should not update orderer, if first or lastname were not provided', (done) => {
			chai.request(app)
				.post('/product/create')
				.send(product)
				.end((err, res) => {
					should.exist(res.body);
					res.body.should.have.property('product');
					const newOrder = {
						product: [
							{
								id: res.body.product._id,
								quantity: 2
							}
						],
						orderer: {
							firstname: 'Krista',
							lastname: 'Hund'
						},
						adress: {
							street: 'Rheinallee',
							houseNr: '12b',
							zip: '12345',
							city: 'Frankfurt',
							country: 'Germany'
						},
						email: 'hallo@gmail.com'
					};
					chai.request(app)
						.post('/order/create')
						.send(newOrder)
						.end((err, result) => {
							result.should.have.status(201);
							chai.request(app)
								.put(`/order/update/${result.body.order._id}`)
								.send({
									'orderer': {
										'firstname': 'Krista'
									}
								})
								.end((err, updateRes) => {
									should.exist(updateRes.body);
									updateRes.should.have.status(500);
									done();
								});

						});
				});
		});

		it('should update adress, if all required fields were provided', (done) => {
			chai.request(app)
				.post('/product/create')
				.send(product)
				.end((err, res) => {
					should.exist(res.body);
					res.body.should.have.property('product');
					const newOrder = {
						product: [
							{
								id: res.body.product._id,
								quantity: 2
							}
						],
						orderer: {
							firstname: 'Krista',
							lastname: 'Hund'
						},
						adress: {
							street: 'Rheinallee',
							houseNr: '12b',
							zip: '12345',
							city: 'Frankfurt',
							country: 'Germany'
						},
						email: 'hallo@gmail.com'
					};
					chai.request(app)
						.post('/order/create')
						.send(newOrder)
						.end((err, result) => {
							result.should.have.status(201);
							chai.request(app)
								.put(`/order/update/${result.body.order._id}`)
								.send({
									'adress': {
										'street': 'Palmengarten',
										'houseNr': '12b',
										'zip': '12245',
										'city': 'Frankfurt',
										'country': 'Deutchland'
									}
								})
								.end((err, updateRes) => {
									should.exist(updateRes.body);
									updateRes.should.have.status(200);
									updateRes.should.be.json;
									updateRes.body.should.be.a('object');
									updateRes.body.should.have.property('order');
									updateRes.body.order.should.be.a('object');
									updateRes.body.order.should.have.property('adress');
									updateRes.body.order.adress.should.have.property('street');
									updateRes.body.order.adress.street.should.equal('Palmengarten');
									done();
								});

						});
				});
		});
	});
});

