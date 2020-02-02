const express = require('express'),
    router = express.Router(),
    validator = require('../middlewares/validator'),
    authSchema = require('../validations/auth');
    authController = require('../controllers/auth');

router.post('/login', validator(authSchema.login, 'body'), authController.login);

router.post('/register', validator(authSchema.register, 'body'), authController.register);

module.exports = router;