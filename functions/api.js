const { MongoClient } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('coachpro');
  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const db = await connectToDatabase();
    const appointments = db.collection('appointments');

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body);
      await appointments.insertOne(data);
      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Appointment created successfully' }),
      };
    } else if (event.httpMethod === 'GET') {
      const result = await appointments.find({}).toArray();
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.message }),
    };
  }
};
