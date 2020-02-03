const app = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
require('mocha');

chai.use(chaiHttp);
chai.should();

describe('user registration', () => {
    it('should test for registration failure due to bad request', function (done) {
        chai.request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Ekoh Franklin',
                email: 'ekohfranklin@gmail.com',
                bio: 'Dial my number or email',
                phone: '08178018780',
                username: '',
                password: 'Mskskd787'
            })
            .end((err, res) => {
                if (!err){
                    res.status.should.to.be.oneOf([422]);
                }
                done();
            });
    });
});