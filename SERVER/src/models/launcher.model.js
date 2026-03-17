const { getDB } = require('../config/db')
const { ObjectId } = require('mongodb')

function getCollection() {
  return getDB().collection('launchers')
}

async function findAllLaunchers() {
  return getCollection().find({}).toArray()
}

async function findLauncherById(id) {
  return getCollection().findOne({ _id: new ObjectId(id) })
}

async function createLauncher(data) {
  const result = await getCollection().insertOne(data)
  return result
}

async function deleteLauncherById(id) {
  return getCollection().deleteOne({ _id: new ObjectId(id) })
}

module.exports = { findAllLaunchers, findLauncherById, createLauncher, deleteLauncherById }