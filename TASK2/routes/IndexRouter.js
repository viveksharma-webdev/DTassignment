const express = require('express');
const router = express.Router();

const {AllNudge} = require('./controllers/nudgeController');
router.get('/',AllNudge);
module.exports = router;