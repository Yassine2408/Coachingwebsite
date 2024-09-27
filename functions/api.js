require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db('coachpro');
  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const db = await connectToDatabase();
    // Your database operations here
    return { statusCode: 200, body: JSON.stringify({ message: 'Connected to database successfully' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to connect to database' }) };
  }
};
