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

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({message: "Function is working"})
  };
}
