const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');
const JsonFeedController = require('./app/controllers/JsonFeedController');

routes.get('/', (req, res) => {
    res.send('Olá, Siga as instruções no README do repositório');
});

routes.post('/sessions', SessionController.store);

routes.post('/createUser', SessionController.create);

routes.use(authMiddleware);

routes.get('/feedJsoner', JsonFeedController.feedRead);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;