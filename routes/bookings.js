import express from 'express'
import { body, validationResult } from 'express-validator'
import Booking from '../models/Booking.js'
import Package from '../models/Package.js'
import { sendBookingEmails } from '../utils/emailService.js'

const router = express.Router()

// Create booking
router.post('/',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('zipCode').trim().notEmpty().withMessage('Zip code is required'),
    body('numberOfAdults').isInt({ min: 1 }).withMessage('At least 1 adult is required'),
    body('numberOfChildren').isInt({ min: 0 }).withMessage('Number of children must be 0 or more'),
    body('travelDate').notEmpty().withMessage('Travel date is required'),
    body('packageId').notEmpty().withMessage('Package ID is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const packageData = await Package.findById(req.body.packageId)
      if (!packageData) {
        return res.status(404).json({ message: 'Package not found' })
      }

      const booking = new Booking(req.body)
      await booking.save()

      // Send emails
      try {
        await sendBookingEmails(booking, packageData)
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        // Don't fail the booking if email fails
      }

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        booking
      })
    } catch (error) {
      console.error('Booking error:', error)
      res.status(500).json({ message: error.message })
    }
  }
)

export default router

