const loans = require('../models/loan.model');
const { asyncHandler, positiveId, dateOnly, allowedFields } = require('../utils/http');

exports.borrow = asyncHandler(async (req, res) => {
  allowedFields(req.body, ['member_id', 'book_id', 'due_date']);
  const loan = await loans.borrow({
    member_id: positiveId(req.body.member_id, 'member_id'),
    book_id: positiveId(req.body.book_id, 'book_id'),
    due_date: dateOnly(req.body.due_date, 'due_date')
  });
  res.status(201).json(loan);
});

exports.returnLoan = asyncHandler(async (req, res) => {
  const loan = await loans.returnLoan(positiveId(req.params.id));
  res.json(loan);
});

exports.bookReport = asyncHandler(async (req, res) => {
  res.json(await loans.bookReport());
});

exports.overdueReport = asyncHandler(async (req, res) => {
  res.json(await loans.overdueReport());
});
