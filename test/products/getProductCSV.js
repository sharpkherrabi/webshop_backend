/** Package imports */
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

/** File imports */
const app = require('../../app');
const productModel = require('../../models/product.model');

/** Chai plugins */
chai.use(chaiHttp);

/** Tests */
describe('Product tests', () => {
	beforeEach((done) => {
		productModel.deleteMany({}, () => {
			done();
		});
	});

	describe('/getCSV with products', () => {
		it('should download csv file with all products', (done) => {
			chai.request(app)
				.get('/product/getCSV')
				.end((err, res) => {
					if(err){done(err);}
					expect(res).to.have.status(200);                    
					res.should.have.header('Content-Type');
                    res.should.have.header('Content-Disposition');
					done();
				});
		});
	});
});
