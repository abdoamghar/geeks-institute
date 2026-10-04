const router = require('express').Router();
const loans = require('../controllers/loan.controller');

router.get('/books', loans.bookReport);
router.get('/overdue', loans.overdueReport);

module.exports = router;
