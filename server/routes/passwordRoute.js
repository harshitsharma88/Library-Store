const Router = require('express').Router();
const passwordController = require('../controllers/passwordController');


Router.post('/forgot',passwordController.forgotPassword);

Router.post('/update',passwordController.updatePassword);

Router.get('/setnew/:rqstid',passwordController.setNewPassword);

module.exports = Router;