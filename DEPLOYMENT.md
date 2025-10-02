# 🚀 Deployment Guide - Salon Booking App

This guide will help you deploy your MERN stack salon booking application to free hosting platforms.

## 📋 Prerequisites

1. **GitHub Account** - For code repository
2. **MongoDB Atlas Account** - For cloud database (free tier available)
3. **Railway/Render Account** - For backend hosting (free tier available)
4. **Vercel/Netlify Account** - For frontend hosting (free tier available)

## 🗄️ Step 1: Set Up MongoDB Atlas (Free Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free M0 tier)

### 1.2 Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Set privileges to "Read and write to any database"

### 1.3 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)

### 1.4 Get Connection String
1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `salon-booking`

**Example connection string:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/salon-booking?retryWrites=true&w=majority
```

## 🖥️ Step 2: Deploy Backend (Railway - Free Tier)

### 2.1 Prepare Repository
1. Push your code to GitHub
2. Make sure all files are committed

### 2.2 Deploy to Railway
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect it's a Node.js app

### 2.3 Configure Environment Variables
In Railway dashboard, go to your project → Variables tab and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/salon-booking?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_here_make_it_long_and_random
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.vercel.app
```

### 2.4 Deploy
1. Railway will automatically deploy
2. Get your backend URL (e.g., `https://your-app.railway.app`)

## 🌐 Step 3: Deploy Frontend (Vercel - Free Tier)

### 3.1 Prepare Frontend
1. Update `client/package.json` to remove the proxy:
```json
{
  "proxy": "https://your-backend-url.railway.app"
}
```

### 3.2 Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Set Root Directory to `client`
6. Add Environment Variables:
   - `REACT_APP_API_URL=https://your-backend-url.railway.app`

### 3.3 Update API Calls
Update all API calls in your React app to use the environment variable:

```javascript
// In your API calls, replace:
axios.get('/api/services')

// With:
axios.get(`${process.env.REACT_APP_API_URL}/api/services`)
```

## 🔧 Step 4: Update CORS Configuration

Update your backend `server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
```

## 🌱 Step 5: Seed Database

After deployment, you can seed your database with sample data:

1. Connect to your deployed backend
2. Run the seed commands:
```bash
npm run seed-services
npm run create-admin
```

## 🔗 Alternative Free Hosting Options

### Backend Hosting:
- **Render** (https://render.com) - Free tier available
- **Heroku** (https://heroku.com) - Free tier discontinued, but paid options available
- **Railway** (https://railway.app) - Free tier available

### Frontend Hosting:
- **Netlify** (https://netlify.com) - Free tier available
- **Vercel** (https://vercel.com) - Free tier available
- **GitHub Pages** - Free for static sites

### Database Hosting:
- **MongoDB Atlas** - Free tier available
- **Railway MongoDB** - Free tier available

## 📱 Step 6: Test Your Deployment

1. **Test Backend**: Visit your backend URL + `/api/services`
2. **Test Frontend**: Visit your frontend URL
3. **Test Database**: Try registering a user
4. **Test Admin**: Login with admin credentials

## 🎉 You're Live!

Your salon booking app is now deployed and accessible worldwide!

### Default Admin Credentials:
- **Email**: admin@beautysalon.com
- **Password**: admin123

## 🔧 Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure CLIENT_URL is set correctly
2. **Database Connection**: Verify MongoDB Atlas connection string
3. **Environment Variables**: Double-check all variables are set
4. **Build Errors**: Check Node.js version compatibility

### Useful Commands:
```bash
# Check logs
railway logs

# Restart service
railway restart

# Check environment variables
railway variables
```

## 📊 Monitoring

- **Railway**: Monitor backend performance and logs
- **Vercel**: Monitor frontend performance and analytics
- **MongoDB Atlas**: Monitor database performance

## 🔄 Updates

To update your app:
1. Push changes to GitHub
2. Railway and Vercel will automatically redeploy
3. Test the changes

---

**🎊 Congratulations! Your salon booking app is now live on the internet!**
