const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/salon-booking';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Sample services data
const sampleServices = [
  {
    name: 'Hair Cut & Style',
    description: 'Professional haircut and styling service. Our expert stylists will give you the perfect cut and style that suits your face shape and lifestyle.',
    price: 45,
    duration: 60,
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    isActive: true
  },
  {
    name: 'Hair Coloring',
    description: 'Transform your look with our professional hair coloring service. We use premium products and techniques to achieve your desired color.',
    price: 80,
    duration: 90,
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400',
    isActive: true
  },
  {
    name: 'Highlights & Lowlights',
    description: 'Add dimension and depth to your hair with our expert highlighting and lowlighting techniques.',
    price: 95,
    duration: 120,
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
    isActive: true
  },
  {
    name: 'Hair Treatment',
    description: 'Deep conditioning and repair treatment for damaged hair. Restore moisture and shine to your locks.',
    price: 60,
    duration: 45,
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
    isActive: true
  },
  {
    name: 'Manicure',
    description: 'Complete nail care service including shaping, cuticle care, and polish application.',
    price: 35,
    duration: 45,
    category: 'Nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
    isActive: true
  },
  {
    name: 'Pedicure',
    description: 'Relaxing foot care service with nail shaping, cuticle care, and polish application.',
    price: 45,
    duration: 60,
    category: 'Nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
    isActive: true
  },
  {
    name: 'Gel Manicure',
    description: 'Long-lasting gel manicure that stays perfect for weeks.',
    price: 50,
    duration: 60,
    category: 'Nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
    isActive: true
  },
  {
    name: 'Facial Treatment',
    description: 'Deep cleansing facial treatment to rejuvenate and refresh your skin.',
    price: 70,
    duration: 75,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
    isActive: true
  },
  {
    name: 'Anti-Aging Facial',
    description: 'Specialized facial treatment designed to reduce fine lines and improve skin texture.',
    price: 90,
    duration: 90,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
    isActive: true
  },
  {
    name: 'Deep Tissue Massage',
    description: 'Therapeutic massage focusing on deeper layers of muscle tissue to relieve tension.',
    price: 85,
    duration: 60,
    category: 'Massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    isActive: true
  },
  {
    name: 'Swedish Massage',
    description: 'Relaxing full-body massage using long strokes and kneading techniques.',
    price: 75,
    duration: 60,
    category: 'Massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    isActive: true
  },
  {
    name: 'Hot Stone Massage',
    description: 'Therapeutic massage using heated stones to relax muscles and improve circulation.',
    price: 100,
    duration: 75,
    category: 'Massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    isActive: true
  },
  {
    name: 'Bridal Makeup',
    description: 'Professional makeup application for your special day. Includes trial session.',
    price: 120,
    duration: 90,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    isActive: true
  },
  {
    name: 'Evening Makeup',
    description: 'Glamorous makeup application perfect for special events and evenings out.',
    price: 65,
    duration: 60,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    isActive: true
  },
  {
    name: 'Eyebrow Shaping',
    description: 'Professional eyebrow shaping and styling to enhance your natural beauty.',
    price: 25,
    duration: 30,
    category: 'Other',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    isActive: true
  },
  {
    name: 'Eyelash Extensions',
    description: 'Luxurious eyelash extensions for fuller, longer lashes.',
    price: 110,
    duration: 120,
    category: 'Other',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    isActive: true
  }
];

// Function to seed services
const seedServices = async () => {
  try {
    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Insert sample services
    const insertedServices = await Service.insertMany(sampleServices);
    console.log(`Successfully inserted ${insertedServices.length} services`);

    // Display inserted services
    console.log('\nInserted Services:');
    insertedServices.forEach((service, index) => {
      console.log(`${index + 1}. ${service.name} - $${service.price} (${service.duration} min) - ${service.category}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedServices();
