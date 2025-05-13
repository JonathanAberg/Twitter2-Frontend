const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWidth('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hemlig_nyckel');

            req.user = await User.findById(decoded.id).select('-password');

            next ();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Inte auktoriserad, token misslyckades' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Inte auktoriserad, ingen token' });
    }
};

module.exports = { protect };