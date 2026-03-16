const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGO_URI)
// console.log(client)
let db

async function connectDB() {
  await client.connect()
  db = client.db()

  // console.log(db)
  console.log('Connected to MongoDB')
}

function getDB() {
  console.log(db)
  return db
}

module.exports = { connectDB, getDB }



