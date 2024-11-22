const express = require('express');
const router = express.Router();

const {NudgeById} = require('./controllers/nudgeController');

router.get('/nudge/:id',NudgeById);
module.exports = router;