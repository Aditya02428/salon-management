#!/bin/bash

# Build script for Vercel deployment
echo "🔨 Building React app for production..."

# Navigate to client directory
cd client

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the app
echo "🏗️ Building the app..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build files are in client/build/"
