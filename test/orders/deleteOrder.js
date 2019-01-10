/** Package imports */
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

/** File imports */
const app = require('../../app');
const productModel = require('../../models/product.model');
//const orderModel = require('../../models/order.model');

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

	describe('/DELETE order', () => {
		it('should delete order by given id', (done) => {
			chai.request(app)
				.post('/product/create')
				.send(product)
				.end((err, res1) => {
					should.exist(res1.body);
					res1.body.should.have.property('product');
					const newOrder = {
						product: [
							{
								'id': res1.body.product._id,
								'quantity': 2
							}
						],
						orderer: {
							firstName: 'Krista',
							lastName: 'Faul'
						},
						address: {
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
							result.body.should.have.property('order');
							result.should.have.status(201);
							result.should.be.json;
							result.body.should.be.a('object');
							result.body.order.should.have.property('orderer');
							result.body.order.should.have.property('product');
							result.body.order.should.have.property('address');
							result.body.order.should.have.property('price');
							result.body.order.should.be.a('object');
							result.body.order.price.should.equal(product.unitPrice * newOrder.product[0].quantity);
                            
							chai.request(app)
								.delete(`/order/delete/${result.body.order._id}`)
								.end((err, res)=>{
									res.should.have.status(200);
									res.body.should.have.property('status');
									res.body.status.should.equal('DELETED');
								});
							done();
						});
				});
		});
	});
});

