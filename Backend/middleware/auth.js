const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
   // Token aus dem Header abrufen
    const token = req.header('x-auth-token');

    // Prüfen, ob ein Token existieren
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
