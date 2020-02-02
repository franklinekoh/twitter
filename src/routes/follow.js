const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const followSchema = require('../validations/follow');
const followController = require('../controllers/folllow');

router.post('/', [auth.required, validator(followSchema.create, 'body')], followController.create);

module.exports = router;