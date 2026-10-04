const members = require('../models/member.model');
const {
  HttpError, asyncHandler, positiveId, requiredText, dateOnly, allowedFields
} = require('../utils/http');

exports.create = asyncHandler(async (req, res) => {
  allowedFields(req.body, ['full_name', 'email', 'join_date']);
  const email = requiredText(req.body.email, 'email').toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(400, 'email must be a valid email address');
  }
  const member = await members.create({
    full_name: requiredText(req.body.full_name, 'full_name'),
    email,
    join_date: req.body.join_date === undefined
      ? undefined : dateOnly(req.body.join_date, 'join_date')
  });
  res.status(201).json(member);
});

exports.loans = asyncHandler(async (req, res) => {
  const id = positiveId(req.params.id);
  const member = await members.findById(id);
  if (!member) throw new HttpError(404, 'Member not found');
  res.json(await members.loanHistory(id));
});
