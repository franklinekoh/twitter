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
                    res.status.should.to.be.eq(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eq('\"username\" is not allowed to be empty');
                }
                done();
            });
    });

    it('should test for registration success ', function (done) {
        chai.request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Ekoh Franklin',
                email: 'ekohfranklin@gmail.com',
                bio: 'Hola! via email or phone',
                phone: '08178018780',
                username: '@_thefrank',
                password: 'Mskskd787'
            })
            .end((err, res) => {
                if (!err){
                    res.status.should.to.be.oneOf([201]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                }
                done();
            });
    });
});

describe('user login', () => {
    it('should test for correct credentials', function (done) {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                user_id: 'ekohfranklin@gmail.com',
                password: 'Mskskd787'
            })
            .end((err, res) => {
                if (!err){
                    res.status.should.to.be.eq(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                }
                done();
            });
    });

    it('should test for wrong credentials', function (done) {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                user_id: 'ekohfrksjd@gmail.com',
                password: 'Mskskd'
            })
            .end((err, res) => {
                if (!err){
                    res.status.should.to.be.eq(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eq('incorrect credentials');
                }
                done();
            });
    });
});