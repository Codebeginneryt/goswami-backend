import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import packageRoutes from './routes/packages.js'
import bookingRoutes from './routes/bookings.js'
import adminRoutes from './routes/admin.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    : true, // Allow all origins in development
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from public directory (if needed)
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use('/assets', express.static(join(__dirname, '../public/assets')))

// Routes
app.use('/api/packages', packageRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Start server first, then connect to MongoDB
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  
  // Connect to MongoDB (non-blocking)
  const connectMongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://goswami7497:Test@123@cluster-goswami.ium7rkf.mongodb.net/?appName=Cluster-goswami', {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000,
      })
      console.log('✓ Connected to MongoDB')
    } catch (error) {
      console.error('✗ MongoDB connection error:', error.message)
      console.log('⚠ Server is running but MongoDB is not connected.')
      console.log('⚠ Some features (login, bookings) will not work until MongoDB is connected.')
      console.log('💡 To fix: Start MongoDB or use MongoDB Atlas and update MONGODB_URI in .env')
    }
  }
  connectMongoDB()
})

export default app

