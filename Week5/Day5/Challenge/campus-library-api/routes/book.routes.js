const router = require('express').Router();
const books = require('../controllers/book.controller');

router.get('/', books.list);
router.get('/:id', books.get);
router.post('/', books.create);
router.patch('/:id', books.update);
router.delete('/:id', books.remove);

module.exports = router;
