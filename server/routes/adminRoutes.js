const Router = require('express').Router();
const adminController= require('../controllers/adminController');
const authenticate = require('../middleware/auth');

Router.get('/',adminController.getAdminPage);

Router.post('/',adminController.adminLogin);

Router.post('/add-book',authenticate,adminController.addBook);

module.exports = Router;