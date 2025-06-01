const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');



// Import the User model to interact with the users collection in the database
const User = require('../../models/User');


//test route
//access Public
//route GET api/users
//description Register User

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }

    const { name, email, password } = req.body;

    try {

        //See if users exists
        let user = await User.findOne({ email });
        
        if (user) {
           return res.status(400).json({errors:[{msg:'User already exists'}]});
        }

        //Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mp'
        }); //;
        user = new User({
            name,
            email,
            avatar,
            password
        });

        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        //Hash password
        user.password = await bcrypt.hash(password, salt);

        //saves a user
        await user.save();

        //Return jsonwebtoken
        const payload = {
            user: {
                id:user.id
            }
        }
        //jwtToken string for potential error
        //check default.json for the secret token
        jwt.sign(
            payload,
            config.get('jwtSecret'),

            { expiresIn: 360000 },

            (err,token) => {
                if (err) throw err;
                res.json({ token });
            }
        );


    res.send('User registered'); 
    }
    catch(err) {
    console.log(err.message);
        res.status(500).send('Server error....');    
    }

});

module.exports = router;
