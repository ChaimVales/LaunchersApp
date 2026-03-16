const { getDB } = require('../config/db')
const { ObjectId } = require('mongodb')


// const collection = getDB.collection('launchers');
const collection = 'launchers'


async function findAllLaunchers() {
  const cursor = collection.find({});
  const documents = await cursor.toArray();
  return documents;
}

async function findLauncherById(id) {
  return collection().findOne({ _id: new ObjectId(id) })
}

async function createLauncher(data) {
  const result = await collection().insertOne(data)
  console.log('Inserted ID:', result.insertedId);
  return result
}

async function deleteLauncherById(id) {
  const res = await collection.deleteOne({ _id: new ObjectId(id) })
  console.log(res.deletedCount);
  return res
}

module.exports = { findAllLaunchers, findLauncherById, createLauncher, deleteLauncherById }