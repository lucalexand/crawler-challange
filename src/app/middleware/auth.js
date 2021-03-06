const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    const [, token] = authHeaders.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

        req.id = decoded.id;

        return next();
    } catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
};