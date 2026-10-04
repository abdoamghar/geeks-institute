const books = require('../models/book.model');
const {
  HttpError, asyncHandler, positiveId, nonnegativeInteger,
  requiredText, allowedFields
} = require('../utils/http');

function optionalFilter(value, label) {
  if (value === undefined) return null;
  if (typeof value !== 'string') throw new HttpError(400, `${label} must be a string`);
  return value.trim() || null;
}

exports.list = asyncHandler(async (req, res) => {
  const result = await books.list({
    title: optionalFilter(req.query.title, 'title'),
    category: optionalFilter(req.query.category, 'category')
  });
  res.json(result);
});

exports.get = asyncHandler(async (req, res) => {
  const book = await books.findById(positiveId(req.params.id));
  if (!book) throw new HttpError(404, 'Book not found');
  res.json(book);
});

exports.create = asyncHandler(async (req, res) => {
  allowedFields(req.body, ['title', 'author', 'category', 'total_copies']);
  const book = await books.create({
    title: requiredText(req.body.title, 'title'),
    author: requiredText(req.body.author, 'author'),
    category: requiredText(req.body.category, 'category'),
    total_copies: nonnegativeInteger(req.body.total_copies, 'total_copies')
  });
  res.status(201).json(book);
});

exports.update = asyncHandler(async (req, res) => {
  const id = positiveId(req.params.id);
  allowedFields(req.body, ['title', 'author', 'category']);
  const changes = {};
  for (const field of ['title', 'author', 'category']) {
    if (Object.hasOwn(req.body, field)) changes[field] = requiredText(req.body[field], field);
  }
  if (!Object.keys(changes).length) throw new HttpError(400, 'Provide at least one field');
  const book = await books.update(id, changes);
  if (!book) throw new HttpError(404, 'Book not found');
  res.json(book);
});

exports.remove = asyncHandler(async (req, res) => {
  const result = await books.removeIfNoHistory(positiveId(req.params.id));
  if (result === 'missing') throw new HttpError(404, 'Book not found');
  if (result === 'has_loans') throw new HttpError(409, 'Book has loan history');
  res.status(200).json({ message: 'Book deleted' });
});
