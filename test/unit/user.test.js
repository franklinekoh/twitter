const assert = require('assert');
const {User} = require('../../src/database/models');
const { Op } = require('sequelize');

require('mocha');

describe('User model functions', () => {
    it('should return true if password is valid', async function () {
        const user = await User.findOne({
            where: {
                [Op.or]: {
                    email: 'ekohfranklin@gmail.com',
                    username: 'my user id',
                    phone: '081...'
                }
            }
        });

        assert.equal(user.validatePassword('Mskskd787'), true);
    });

    it('should return false if password is wrong', async function () {
        const user = await User.findOne({
            where: {
                [Op.or]: {
                    email: 'wrong email',
                    username: '@_thefrank',
                    phone: 'but correct username'
                }
            }
        });
        assert.equal(user.validatePassword('this is a wrong password'), false);
    });

    it('should return string jwt is generated', async function () {
        const user = await User.findOne({
            where: {
                [Op.or]: {
                    email: 'wrong email',
                    username: '@_thefrank',
                    phone: 'but correct username'
                }
            }
        });

        assert.ok(typeof user.generateJWT() === 'string');
    });

    it('should return object with properties', async function () {
        const user = await User.findOne({
            where: {
                [Op.or]: {
                    email: 'wrong email',
                    username: '@_thefrank',
                    phone: 'but correct username'
                }
            }
        });

        assert.ok(typeof user.toAuthJson() === 'object');
        assert.ok(user.toAuthJson().should.have.property('token'));
        assert.ok(user.toAuthJson().should.have.property('name'));
        assert.ok(user.toAuthJson().should.have.property('email'));
        assert.ok(user.toAuthJson().should.have.property('bio'));
        assert.ok(user.toAuthJson().should.have.property('phone'));
        assert.ok(user.toAuthJson().should.have.property('username'));
    });

    it('should return true is email is unique', async function () {
        assert.equal(await User.isUniqueEmail('eko@gmail.com'), true);
    });

    it('should return false if email already exists', async function () {
        assert.equal(await User.isUniqueEmail('ekohfranklin@gmail.com'), false);
    });

    it('should return true if phone is unique', async function () {
        assert.equal(await User.isUniquePhone('08172817392'), true);
    });

    it('should return false if phone already exists', async function () {
        assert.equal(await User.isUniquePhone('08178018780'), false);
    });

    it('should return true if username is unique', async function () {
        assert.equal(await User.isUniqueUsername('@_theekoh'), true);
    });

    it('should return false if phone already exists', async function () {
        assert.equal(await User.isUniqueUsername('@_thefrank'), false);
    });

});