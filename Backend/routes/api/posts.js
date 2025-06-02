const express = require('express');
const router = express.Router();
const auth=require('../../middleware/auth')

//test route
//access Public
//route GET api/Posts

router.get('/',auth, (req, res) => res.send('Auth route'));

module.exports = router;
