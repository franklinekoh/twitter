const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const tweetController = require('../controllers/tweet');
const validator = require('../middlewares/validator');
const tweetValidatorSchema = require('../validations/tweet');


router.post('/post', [auth.required,  upload.image],tweetController.post);

router.post('/reply', [auth.required, upload.image],tweetController.reply);

router.get('/search', [auth.required, validator(tweetValidatorSchema.search, 'query')], tweetController.search);

module.exports = router;