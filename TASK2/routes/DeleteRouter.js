const express = require('express');
const router = express.Router();

const {DeleteNudge} = require('./controllers/nudgeController');


router.delete('/delete/nudge/:id',DeleteNudge);
module.exports = router;