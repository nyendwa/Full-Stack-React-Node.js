const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function (req, res, next) {
    //Get token from the header
    const token = req.header('x-auth-token');
    //check if token is present
    if (!token) {
        return res.status(401).json({ mesg: 'No token, autherisation not granted' });
    }
    //verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid Token' });
        
    }
}