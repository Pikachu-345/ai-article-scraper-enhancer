# Setup MongoDB Atlas (Free Tier)

## Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email or GitHub account
3. Choose "Free" plan (M0 cluster)

## Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0) tier
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Click "Create Cluster"

## Step 3: Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

## Step 4: Configure Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - This adds `0.0.0.0/0`
4. Click "Confirm"

## Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `myFirstDatabase` with `beyondchats`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/beyondchats?retryWrites=true&w=majority
```

## Step 6: Update Backend .env
Paste the connection string in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/beyondchats?retryWrites=true&w=majority
```

## Step 7: Test Connection
```bash
cd backend
npm run dev
```

If you see "✅ MongoDB Connected", you're all set!
