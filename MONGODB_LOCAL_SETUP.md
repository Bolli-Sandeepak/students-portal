# 🗄️ MongoDB Local Setup & Compass Connection

## Step 1: Install MongoDB Community Edition

### Download MongoDB

**Go to:** https://www.mongodb.com/try/download/community

1. Choose **Windows** (or your OS)
2. Choose **msi** file (installer)
3. Download the latest version
4. Run installer
5. Click **Next** → **Next** → Install as Service → **Install**

---

## Step 2: Start MongoDB Service

### Windows Terminal (as Administrator)

```powershell
# Check if MongoDB is installed
mongod --version

# Start MongoDB manually
mongod

# Or start as Windows Service
net start MongoDB
```

**You should see:**
```
waiting for connections on port 27017
```

This means MongoDB is running! ✅

---

## Step 3: Install MongoDB Compass

### Download Compass

**Go to:** https://www.mongodb.com/products/tools/compass

1. Download **MongoDB Compass** (free)
2. Run installer
3. Click Install
4. Open Compass

---

## Step 4: Connect to Local MongoDB in Compass

### Open MongoDB Compass

1. Launch **MongoDB Compass**
2. You'll see **"New Connection"** form

### Connection String for Local MongoDB

**Paste this connection string:**

```
mongodb://localhost:27017
```

**OR**

```
mongodb://127.0.0.1:27017
```

### Step-by-Step in Compass

1. Copy connection string above
2. In Compass Top bar, click **"NEW CONNECTION"**
3. Paste in connection string field
4. Click **"CONNECT"**

**You should see:**
```
✅ Connected
```

---

## Step 5: Create Database & Collection

### In MongoDB Compass

1. Click **"+"** button (Create Database)
2. Fill in:
   - **Database Name**: `acadportal_db`
   - **Collection Name**: `users`
3. Click **"CREATE DATABASE"**

**You now have:**
- Database: `acadportal_db`
- Collection: `users`

---

## Step 6: Update Backend .env File

Now create this file in your backend folder:

**File: `backend/.env`**

```env
# MongoDB Local Connection
MONGO_URI=mongodb://localhost:27017/acadportal_db

# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5500

# JWT (optional)
JWT_SECRET=your_secret_key_123
```

**Save this file!**

---

## Step 7: Test Connection in Terminal

### Start Backend

```bash
cd backend
npm install
node server.js
```

**You should see:**
```
✅ MongoDB Connected
Server running on port 5000
```

---

## 🔗 Quick Links Reference

| Service | URL/Connection String | Port |
|---------|----------------------|------|
| **Local MongoDB** | `mongodb://localhost:27017` | 27017 |
| **MongoDB Compass** | Download: https://www.mongodb.com/products/tools/compass | N/A |
| **MongoDB Community** | Download: https://www.mongodb.com/try/download/community | N/A |
| **Your Database** | `mongodb://localhost:27017/acadportal_db` | 27017 |
| **Backend API** | `http://localhost:5000` | 5000 |

---

## MongoDB Compass Quick Tutorial

### View All Databases
1. Open Compass
2. Left sidebar shows all databases
3. Click database name to expand
4. Click collection to see data

### Insert Test Data in Compass

1. Click `acadportal_db` → `users`
2. Click **"INSERT DOCUMENT"**
3. Paste this JSON:

```json
{
  "name": "Test Student",
  "regNo": "21BCE1234",
  "email": "test@test.com",
  "password": "test123456",
  "semester": 6,
  "cgpa": 8.76,
  "attendancePercentage": 87
}
```

4. Click **"INSERT"**

You now have test data! ✅

---

## Verify Everything Works

### Check MongoDB is Running

```bash
# In new terminal
mongo --version

# Test connection
mongo mongodb://localhost:27017/acadportal_db
```

### Check Backend Connects

```bash
cd backend
node server.js
```

Should show: `MongoDB Connected ✅`

### Check Frontend Works

1. Right-click `frontend/index.html`
2. Open with Live Server
3. Go to `http://localhost:5500`
4. Signup with test credentials
5. Should create account in MongoDB!

---

## 🚨 Troubleshooting

### Error: "Cannot connect to MongoDB"

**Solution 1: Start MongoDB Service**
```bash
net start MongoDB
# OR
mongod
```

**Solution 2: Check Port 27017**
```bash
# Windows
netstat -ano | findstr :27017

# If not running, start MongoDB
mongod
```

**Solution 3: Install Missing Dependencies**
```bash
cd backend
npm install mongoose
```

### Error: "EADDRINUSE :::27017"

**Port already in use - MongoDB already running somewhere**

```bash
# Kill the process on Windows
taskkill /PID <PID> /F

# Or restart computer
```

### MongoDB Compass Connection Failed

1. Make sure `mongod` is running
2. Try connection string: `mongodb://localhost:27017`
3. Check Windows Firewall (allow port 27017)
4. Restart Compass

---

## All Commands Reference

```bash
# Check MongoDB version
mongod --version

# Start MongoDB (keeps running)
mongod

# Start MongoDB as service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Connect via CLI
mongo mongodb://localhost:27017

# Check if running
tasklist | findstr mongod
```

---

## Database Files Location

MongoDB stores data in:
```
C:\Program Files\MongoDB\Server\<version>\data
```

If you need to reset database:
1. Stop MongoDB service
2. Delete the `data` folder
3. Restart MongoDB

---

## Summary - What You Have Now

✅ **MongoDB Running Locally**
- Connection: `mongodb://localhost:27017`
- Database: `acadportal_db`
- Collection: `users`
- Port: 27017

✅ **MongoDB Compass Connected**
- Tool to view/edit data visually
- Can insert test documents
- Monitor all collections

✅ **Backend Configured**
- `.env` file with MONGO_URI
- Ready to run `node server.js`
- Will connect to local MongoDB

✅ **Frontend Ready**
- Can signup/login
- Data saves to MongoDB
- Test locally at `http://localhost:5500`

---

## Next Steps

1. ✅ Install & start MongoDB locally
2. ✅ Open MongoDB Compass
3. ✅ Create database `acadportal_db`
4. ✅ Update `.env` with connection string
5. ✅ Start backend: `node server.js`
6. ✅ Open frontend: `http://localhost:5500`
7. ✅ Test signup/login

---

**Version**: 1.0 - Local MongoDB Setup
**Date**: April 4, 2026
