const { getDB } = require('../config/db')

function getCollection() {
  return getDB().collection('users')
}

async function findByUserType(user_type) {
  return getCollection().findOne({ user_type })
}

async function findByUserTypePassword(user) {

  return getCollection().findOne( {user_type:user.user_type} & {password:user.password} )
}
async function createUser(userData) {
  const result = await getCollection().insertOne(userData)
  return result
}

async function putUser(userData) {
  const role = userData.user_type
  const result = await getCollection().updateOne(
    { user_type: role },
    { $set: userData }
  );
  return result
}

async function deleteUserByRole(role) {
  return getCollection().deleteOne({ user_type: role })
}

async function findAllUsers() {
  return getCollection().find({}).toArray()
}

module.exports = { findByUserType, createUser, putUser, deleteUserByRole, findAllUsers, findByUserTypePassword }