const express = require('express');
const router = express.Router();

const {UpdateNudge} = require('./controllers/nudgeController');


router.put('/update/nudge/:id',UpdateNudge);

module.exports = router;