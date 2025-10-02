# BeautySalon - MERN Stack Booking Application

A full-stack salon booking web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows customers to book salon appointments, view services, manage their bookings, and provides an admin panel for salon management.

## Features

### Customer Features
- **User Authentication**: Register and login with JWT authentication
- **Service Browsing**: View all available salon services with categories
- **Online Booking**: Book appointments with calendar and time slot selection
- **Booking Management**: View booking history, cancel upcoming appointments
- **Profile Management**: Update personal information and change password
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Service Management**: Add, edit, and delete salon services
- **Booking Management**: View all bookings and update booking status
- **User Management**: Access to customer information
- **Dashboard**: Overview of all salon operations

### Technical Features
- **Real-time Availability**: Dynamic time slot availability checking
- **Secure Authentication**: JWT-based authentication with password hashing
- **Data Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and user feedback
- **Modern UI**: Beautiful, responsive design with smooth animations

## Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation

### Frontend
- **React.js**: Frontend framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React DatePicker**: Date selection component
- **React Toastify**: Notifications
- **Styled Components**: CSS-in-JS styling
- **React Icons**: Icon library

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/salon-booking
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   PORT=5000
   ```

3. **Start the application**:
   ```bash
   npm run dev
   ```

4. **Seed sample data**:
   ```bash
   npm run seed
   ```

5. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🌐 Deployment to Free Hosting Platforms

### 🎯 Quick Deployment (Recommended)

1. **Follow the detailed deployment guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
2. **Or use the deployment script**:
   ```bash
   ./deploy.sh
   ```

### 📋 Free Hosting Options

| Platform | Service | Free Tier | Best For |
|----------|---------|-----------|----------|
| **Railway** | Backend | ✅ Yes | Node.js apps |
| **Render** | Backend | ✅ Yes | Full-stack apps |
| **Vercel** | Frontend | ✅ Yes | React apps |
| **Netlify** | Frontend | ✅ Yes | Static sites |
| **MongoDB Atlas** | Database | ✅ Yes | Cloud database |

### 🔧 Environment Variables for Production

```env
# Backend (Railway/Render)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salon-booking
JWT_SECRET=your_super_secure_jwt_secret_key_here
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.vercel.app

# Frontend (Vercel/Netlify)
REACT_APP_API_URL=https://your-backend-domain.railway.app
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)

### Bookings
- `GET /api/bookings/available-slots` - Get available time slots
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/admin/all` - Get all bookings (Admin only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (customer/admin),
  avatar: String
}
```

### Service Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  duration: Number (minutes),
  category: String,
  image: String,
  isActive: Boolean
}
```

### Booking Model
```javascript
{
  user: ObjectId (ref: User),
  service: ObjectId (ref: Service),
  date: Date,
  timeSlot: String,
  status: String (pending/confirmed/completed/cancelled),
  notes: String,
  totalPrice: Number
}
```

## Usage

### For Customers
1. **Register/Login**: Create an account or sign in
2. **Browse Services**: View available salon services
3. **Book Appointment**: Select service, date, and time slot
4. **Manage Bookings**: View booking history and cancel if needed
5. **Update Profile**: Manage personal information

### For Admins
1. **Access Admin Panel**: Login with admin account
2. **Manage Services**: Add, edit, or remove salon services
3. **View Bookings**: See all customer bookings
4. **Update Status**: Change booking status (pending/confirmed/completed)

## Default Admin Account

To create an admin account, you can either:
1. Register normally and manually update the role in the database
2. Use MongoDB Compass or CLI to create an admin user

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.

## Future Enhancements

- Email notifications for bookings
- Payment integration
- Staff management
- Advanced reporting
- Mobile app development
- Multi-location support
