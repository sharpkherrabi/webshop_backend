/** Package imports */
const chai = require('chai');
const chaiHttp = require('chai-http');


/** File imports */
const app = require('../../app');
const productModel = require('../../models/product.model');

/** Cahi plugins */
chai.use(chaiHttp);

/** Tests */
describe('Product tests', () => {
	beforeEach((done) => {
		productModel.deleteMany({}, () => {
			done();
		});
	});

	describe('/DELETE product', () => {
		it('should delete product by given id', (done) => {
			const newProduct = new productModel({
				name: 'Lichetrkette 3D Stern',
				description: '3D LED 9er Sternenkette für innen & außen',
				unitPrice: '9990',
				quantity: '20',
				image: 'https://images-na.ssl-images-amazon.com/images/I/81CB1CPtWOL._SL1500_.jpg'
			});
			newProduct.save((err, product) => {
				chai.request(app)
					.delete('/product/delete/' + product.id)
					.end((err, res) => {
						res.should.have.status(200);
						done();
					});
			});
		});
	});
});