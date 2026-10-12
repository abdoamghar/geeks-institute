import { MongoClient } from 'mongodb';

let client;
let database;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is missing');
  }

  client = new MongoClient(uri);
  await client.connect();

  database = client.db();

  const articlesCollection = database.collection('articles');
  const accountsCollection = database.collection('accounts');

  await Promise.all([
    articlesCollection.createIndex({ id: 1 }, { unique: true }),
    accountsCollection.createIndex({ email: 1 }, { unique: true }),
  ]);

  return database;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = undefined;
    database = undefined;
  }
}

export function getDatabase() {
  if (!database) {
    throw new Error('Database connection has not been initialized');
  }

  return database;
}
