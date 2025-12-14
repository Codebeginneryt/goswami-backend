import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import Booking from '../models/Booking.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '24h' }
    )

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all bookings (protected)
router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).populate('packageId')
    
    const stats = {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length
    }

    res.json({
      success: true,
      bookings,
      stats
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

