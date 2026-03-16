const { getDB } = require('../config/db')

const collection = 'users'



async function findByFullName(fullname) {
  return collection().findOne({fullname})
}

async function createUser(userData) {
  const result = await collection().insertOne(data)
  console.log('Inserted ID:', result.insertedId);
  return result
}

module.exports = { findByFullName, createUser }