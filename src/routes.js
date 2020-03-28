const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');
const JsonFeedController = require('./app/controllers/JsonFeedController');

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/feedJsoner', JsonFeedController.feedRead);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;