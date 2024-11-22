const express = require('express');
const router = express.Router();

const {createNudge} = require('./controllers/nudgeController');

router.post('/newnudge',createNudge);
module.exports = router;