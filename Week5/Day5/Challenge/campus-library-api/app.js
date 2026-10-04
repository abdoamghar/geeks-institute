const express = require('express');
const { HttpError } = require('./utils/http');

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.use('/books', require('./routes/book.routes'));
app.use('/members', require('./routes/member.routes'));
app.use('/loans', require('./routes/loan.routes'));
app.use('/reports', require('./routes/report.routes'));

app.use((req, res, next) => next(new HttpError(404, 'Endpoint not found')));

app.use((error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ error: error.message });
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  if (error.code === '23505') {
    return res.status(409).json({ error: 'Email already registered' });
  }
  if (error.code === '23503') {
    return res.status(409).json({ error: 'Record is referenced by another record' });
  }
  if (error.code === '23514' || error.code === '22008') {
    return res.status(400).json({ error: 'Invalid data' });
  }
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
