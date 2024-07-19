const Router = require('express').Router();
const readerController = require('../controllers/readerController');
const authenticate = require('../middleware/auth');

Router.get('/',readerController.getReaderPage);

Router.get('/books',readerController.getAllBooks);

Router.get('/books/fine',authenticate,readerController.getTotalFine);

Router.post('/books/purchase',authenticate,readerController.rentBook);

Router.get('/books/:bookid',readerController.getBookDetails);

module.exports = Router;