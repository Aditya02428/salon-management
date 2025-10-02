#!/bin/bash

# 🚀 Quick Deployment Script for Salon Booking App
# This script helps you deploy your MERN stack app to free hosting platforms

echo "🎉 Welcome to the Salon Booking App Deployment Script!"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Salon booking app"
fi

echo ""
echo "📋 Deployment Checklist:"
echo "1. ✅ MongoDB Atlas database set up"
echo "2. ✅ Railway/Render account for backend"
echo "3. ✅ Vercel/Netlify account for frontend"
echo "4. ✅ GitHub repository created"
echo ""

read -p "Have you completed all the above? (y/n): " completed

if [ "$completed" != "y" ]; then
    echo "❌ Please complete the prerequisites first. Check DEPLOYMENT.md for detailed instructions."
    exit 1
fi

echo ""
echo "🔧 Setting up deployment..."

# Create production build
echo "📦 Building React app for production..."
cd client
npm run build
cd ..

echo ""
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Prepare for deployment"
git push origin main

echo ""
echo "🎯 Next Steps:"
echo "1. Go to Railway (https://railway.app) and deploy your backend"
echo "2. Go to Vercel (https://vercel.com) and deploy your frontend"
echo "3. Set up environment variables as described in DEPLOYMENT.md"
echo "4. Seed your database with sample data"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎊 Happy deploying!"
