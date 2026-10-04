const router = require('express').Router();
const loans = require('../controllers/loan.controller');

router.post('/', loans.borrow);
router.patch('/:id/return', loans.returnLoan);

module.exports = router;
