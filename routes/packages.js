import express from 'express'
import Package from '../models/Package.js'

const router = express.Router()

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(packages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single package
router.get('/:id', async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id)
    if (!packageData) {
      return res.status(404).json({ message: 'Package not found' })
    }
    res.json(packageData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

