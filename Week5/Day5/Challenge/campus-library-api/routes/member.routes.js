const router = require('express').Router();
const members = require('../controllers/member.controller');

router.post('/', members.create);
router.get('/:id/loans', members.loans);

module.exports = router;
