const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const timelineController = require('../controllers/timeline');

router.get('/', auth.required, timelineController.get);

module.exports = router;