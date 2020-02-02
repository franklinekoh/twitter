const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator');
const authSchema = require('../validations/auth');
const authController = require('../controllers/auth');

router.post('/login', validator(authSchema.login, 'body'), authController.login);

router.post('/register', validator(authSchema.register, 'body'), authController.register);

module.exports = router;