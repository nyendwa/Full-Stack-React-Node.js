const express = require('express');
const router = express.Router();

//test route
//access Public
//route GET api/Posts

router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
