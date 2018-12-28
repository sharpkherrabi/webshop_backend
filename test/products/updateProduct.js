/** Package imports */
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

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

    describe('/UPDATE product', () => {
        it('should update product by given ID', (done) => {
            const newProduct = new productModel({
                name: 'Lichetrkette 3D Stern',
                description: '3D LED 9er Sternenkette für innen & außen',
                unitPrice: '9990',
                quantity: '20',
                image: 'https://images-na.ssl-images-amazon.com/images/I/81CB1CPtWOL._SL1500_.jpg'
            });
            newProduct.save((err, product) => {
                chai.request(app)
                    .put('/product/update/' + product.id)
                    .send({ 'name': '3D Sterne' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('product');
                        res.body.product.should.be.a('object');
                        res.body.product.should.have.property('name');
                        res.body.product.name.should.equal('3D Sterne');
                        done();
                    })
            });
        });
    });
});
