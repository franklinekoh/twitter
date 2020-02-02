const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const tweetController = require('../controllers/tweet');
const tweetSchema = require('../validations/tweet');

router.post('/post', [auth.required, validator(tweetSchema.post, 'body'), upload.image],tweetController.post);

router.post('/reply', [auth.required, validator(tweetSchema.reply, 'body'), upload.image],tweetController.reply);

module.exports = router;