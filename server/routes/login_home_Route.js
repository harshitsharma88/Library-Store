const Router = require('express').Router();
const login_home_Controller = require('../controllers/login_homeController');

Router.get('/',login_home_Controller.getLoginPage);

Router.post('/signup',login_home_Controller.createReader);

Router.post('/login',login_home_Controller.login);

module.exports = Router;