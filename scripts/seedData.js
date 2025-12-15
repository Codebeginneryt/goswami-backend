import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Package from '../models/Package.js'
import Admin from '../models/Admin.js'

dotenv.config()

const packages = [
  {
    name: 'Mermaid Beach Resort: The most joyful way to spend your holiday',
    destination: 'Maldives',
    duration: 4,
    description: 'Experience the most joyful way to spend your holiday at Mermaid Beach Resort. Enjoy pristine beaches, crystal clear waters, and world-class amenities.',
    image: '/assets/img/gallery/maldives.png',
    inclusions: ['Accommodation', 'Breakfast', 'Airport Transfer', 'Welcome Drink'],
    rating: 4.5
  },
  {
    name: 'Bora Bora: Enjoy a romantic cruise tour',
    destination: 'Maldives',
    duration: 4,
    description: 'Enjoy a romantic cruise tour of at the sunny side of life. Perfect for couples seeking a memorable getaway.',
    image: '/assets/img/gallery/cinnamon.png',
    inclusions: ['Accommodation', 'All Meals', 'Cruise Tour', 'Spa Session'],
    rating: 4.8
  },
  {
    name: 'Fihalhohi Island Resort: Luxury destination without compromise',
    destination: 'Maldives',
    duration: 4,
    description: 'Luxury destination without compromise. Experience world-class service and breathtaking views.',
    image: '/assets/img/gallery/dhigu.png',
    inclusions: ['Luxury Accommodation', 'All Meals', 'Water Sports', 'Spa & Wellness'],
    rating: 5.0
  },
  {
    name: 'Sky the Limit',
    destination: 'Manali',
    duration: 4,
    description: 'Adventure awaits in the mountains. Perfect for thrill seekers and nature lovers.',
    image: '/assets/img/gallery/sky-the-limit.png',
    inclusions: ['Accommodation', 'Meals', 'Adventure Activities', 'Guide'],
    rating: 4.3
  },
  {
    name: 'Beyond the Blues',
    destination: 'Maldives',
    duration: 4,
    description: 'Escape to paradise and experience the beauty of the ocean.',
    image: '/assets/img/gallery/beyond-the-blues.png',
    inclusions: ['Beach Resort', 'All Meals', 'Snorkeling', 'Sunset Cruise'],
    rating: 4.6
  },
  {
    name: 'Within the Green',
    destination: 'Philippines',
    duration: 4,
    description: 'Immerse yourself in nature and discover the green side of paradise.',
    image: '/assets/img/gallery/green.png',
    inclusions: ['Eco Resort', 'Organic Meals', 'Nature Tours', 'Yoga Sessions'],
    rating: 4.4
  },
  {
    name: 'Queens Gambit',
    destination: 'London',
    duration: 4,
    description: 'Explore the royal city and experience British culture at its finest.',
    image: '/assets/img/gallery/queens-gambit.png',
    inclusions: ['City Hotel', 'Breakfast', 'City Tour', 'Museum Tickets'],
    rating: 4.7
  },
  {
    name: 'City of Canals',
    destination: 'Maldives',
    duration: 4,
    description: 'Discover the charm of the city of canals and waterways.',
    image: '/assets/img/gallery/canals.png',
    inclusions: ['Waterfront Hotel', 'All Meals', 'Boat Tours', 'Cultural Shows'],
    rating: 4.5
  },
  {
    name: 'Mountain Venture',
    destination: 'Maldives',
    duration: 4,
    description: 'Conquer the peaks and enjoy breathtaking mountain views.',
    image: '/assets/img/gallery/mountain-venture.png',
    inclusions: ['Mountain Lodge', 'All Meals', 'Trekking', 'Camping'],
    rating: 4.2
  },
  {
    name: 'Dubai City Explorer',
    destination: 'Dubai',
    duration: 5,
    description: 'Explore the futuristic city of Dubai with its iconic landmarks, luxury shopping, and desert adventures.',
    image: '/assets/img/gallery/dubai.png',
    inclusions: ['5-Star Hotel', 'Breakfast & Dinner', 'City Tour', 'Desert Safari', 'Burj Khalifa Visit'],
    rating: 4.8
  },
  {
    name: 'Paris Romance Package',
    destination: 'Paris',
    duration: 6,
    description: 'Experience the city of love with romantic dinners, iconic landmarks, and French culture.',
    image: '/assets/img/gallery/paris.png',
    inclusions: ['Boutique Hotel', 'All Meals', 'Eiffel Tower Visit', 'Louvre Museum', 'Seine River Cruise'],
    rating: 4.9
  },
  {
    name: 'Agra Heritage Tour',
    destination: 'Agra',
    duration: 3,
    description: 'Discover the magnificent Taj Mahal and rich Mughal heritage in Agra.',
    image: '/assets/img/gallery/agra.png',
    inclusions: ['Heritage Hotel', 'Breakfast', 'Taj Mahal Visit', 'Agra Fort Tour', 'Guide'],
    rating: 4.6
  },
  {
    name: 'Vienna Cultural Journey',
    destination: 'Vienna',
    duration: 5,
    description: 'Immerse yourself in Vienna\'s classical music, art, and imperial history.',
    image: '/assets/img/gallery/vienna.png',
    inclusions: ['City Center Hotel', 'Breakfast', 'Museum Tours', 'Concert Tickets', 'City Pass'],
    rating: 4.7
  },
  {
    name: 'Munich Beer Festival Experience',
    destination: 'Munich',
    duration: 4,
    description: 'Join the world-famous Oktoberfest and explore Bavarian culture.',
    image: '/assets/img/gallery/munich.png',
    inclusions: ['Traditional Hotel', 'Breakfast', 'Oktoberfest Entry', 'City Tour', 'Beer Tasting'],
    rating: 4.5
  },
  {
    name: 'Kuala Lumpur City Break',
    destination: 'Kuala Lumpur',
    duration: 4,
    description: 'Explore the vibrant capital of Malaysia with modern skyscrapers and rich culture.',
    image: '/assets/img/gallery/kualalumpur.png',
    inclusions: ['City Hotel', 'Breakfast', 'Petronas Towers', 'Batu Caves', 'Food Tour'],
    rating: 4.4
  },
  {
    name: 'Moon House Hotel Experience',
    destination: 'Bangkok',
    duration: 4,
    description: 'Stay at the luxurious Moon House Hotel and explore Bangkok\'s vibrant street life.',
    image: '/assets/img/gallery/moon-house-hotel.png',
    inclusions: ['Luxury Hotel', 'All Meals', 'Temple Tours', 'Floating Market', 'Thai Massage'],
    rating: 4.6
  },
  {
    name: 'Blue Mosque Hotel Stay',
    destination: 'Istanbul',
    duration: 5,
    description: 'Experience the blend of European and Asian cultures in historic Istanbul.',
    image: '/assets/img/gallery/blue-mosque-hotel.png',
    inclusions: ['Boutique Hotel', 'Breakfast', 'Blue Mosque Tour', 'Bosphorus Cruise', 'Grand Bazaar'],
    rating: 4.7
  },
  {
    name: 'Hotel Royal Bali',
    destination: 'Bali',
    duration: 6,
    description: 'Relax in paradise with stunning beaches, temples, and Balinese culture.',
    image: '/assets/img/gallery/hotel-royal.png',
    inclusions: ['Beach Resort', 'All Meals', 'Temple Tours', 'Water Sports', 'Spa Sessions'],
    rating: 4.8
  },
  {
    name: 'The Rin Boutique Hotel',
    destination: 'Pattaya',
    duration: 4,
    description: 'Enjoy the vibrant nightlife and beautiful beaches of Pattaya.',
    image: '/assets/img/gallery/boutique-hotel.png',
    inclusions: ['Boutique Hotel', 'Breakfast', 'Beach Activities', 'Nightlife Tour', 'Island Hopping'],
    rating: 4.3
  }
]

const seedDatabase = async () => {
  try {
      console.log(process.env.MONGODB_URI,"process.env.MONGODB_URI    ")

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://goswami7497:Test@123@cluster-goswami.ium7rkf.mongodb.net/?appName=Cluster-goswami')
    console.log('Connected to MongoDB')

    // Clear existing packages
    await Package.deleteMany({})
    console.log('Cleared existing packages')

    // Insert packages
    await Package.insertMany(packages)
    console.log('Packages seeded successfully')

    // Create default admin if not exists
    const adminExists = await Admin.findOne({ email: 'admin@goswamiholidayshub.com' })
    if (!adminExists) {
      const admin = new Admin({
        email: 'admin@goswamiholidayshub.com',
        password: 'admin123', // Change this in production!
        name: 'Admin'
      })
      await admin.save()
      console.log('Default admin created: admin@goswamiholidayshub.com / admin123')
    } else {
      console.log('Admin already exists')
    }

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
