const express = require('express'),
    router = express.Router(),
    validator = require('../middlewares/validator'),
    authSchema = require('../validations/auth');
    authController = require('../controllers/auth');

router.post('/login', validator(authSchema.login, 'body'), authController.login);

module.exports = router;