const app = require('./app');
const pool = require('./db/pool');

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '127.0.0.1';
const server = app.listen(port, host, () => {
  console.log(`Campus Library API listening at http://${host}:${port}`);
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
