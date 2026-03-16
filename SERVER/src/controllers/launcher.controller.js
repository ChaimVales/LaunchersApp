const {
  findAllLaunchers,
  findLauncherById,
  createLauncher,
  deleteLauncherById
} = require('../models/launcher.model')

async function getAll(req, res) {
  try {
    const launchers = await findAllLaunchers()
    res.status(200).json(launchers)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

async function getById(req, res) {
  try {
    const launcher = await findLauncherById(req.params.id)
    if (!launcher) return res.status(404).json({ message: 'Launcher not found' })
    res.status(200).json(launcher)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

async function create(req, res) {
  try {
    const { city, rocketType, latitude, longitude, name } = req.body
    if (!city || !rocketType || !latitude || !longitude || !name) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const result = await createLauncher({ city, rocketType, latitude, longitude, name })
    res.status(200).json({ message: 'Launcher created', id: result.insertedId })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

async function remove(req, res) {
  try {
    const result = await deleteLauncherById(req.params.id)
    if (result.deletedCount === 0)
      return res.status(404).json({ message: 'Launcher not found' })
    res.status(200).json({ message: 'Launcher deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { getAll, getById, create, remove }