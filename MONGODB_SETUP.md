# 🗄️ MongoDB Setup - New Database

## Option 1: MongoDB Atlas (Cloud) - RECOMMENDED ⭐

### Step 1: Create MongoDB Atlas Account

1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Sign Up"**
3. Fill in details:
   - Email
   - Password
   - First Name
   - Last Name
4. Click **"Create Account"**
5. Verify email
6. Accept terms

---

### Step 2: Create New Cluster

1. After login, click **"Create"** or **"Build a Database"**
2. Choose **"M0 Free"** (free tier - perfect for learning)
3. Fill in:
   - **Cloud Provider**: AWS
   - **Region**: Choose closest to you
   - **Cluster Name**: `acadportal` (or your custom name)
4. Click **"Create"**
5. Wait 3-5 minutes for cluster to be ready

---

### Step 3: Create Database User

1. In left sidebar, click **"Security"** → **"Database Access"**
2. Click **"Add New Database User"**
3. Fill in:
   - **Username**: `acadportal_user` (or any name)
   - **Password**: Create strong password (save it!)
   - **Built-in Role**: Select **"Editor"**
4. Click **"Add User"**

**Save these credentials!**
```
Username: acadportal_user
Password: YourStrongPassword123
```

---

### Step 4: Get Connection String

1. In left sidebar, click **"Deployment"** → **"Databases"**
2. Click **"Connect"** button (on your cluster)
3. Choose **"Drivers"** (for NodeJS)
4. Copy the connection string

**It will look like:**
```
mongodb+srv://acadportal_user:YourPassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

### Step 5: Create New Database with Custom Name

1. In same page, click **"Database"** tab
2. Click **"Create Database"**
3. Fill in:
   - **Database Name**: `acadportal_db` (your custom name)
   - **Collection Name**: `users` (optional)
4. Click **"Create"**

Your database is now created! ✅

---

### Step 6: Update Connection String with Database Name

**Original String:**
```
mongodb+srv://acadportal_user:YourPassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Add database name before `?`:**
```
mongodb+srv://acadportal_user:YourPassword@cluster0.xxxxx.mongodb.net/acadportal_db?retryWrites=true&w=majority
```

---

## Option 2: Local MongoDB

### Step 1: Install MongoDB

1. Download: **https://www.mongodb.com/try/download/community**
2. Choose your OS (Windows)
3. Run installer
4. Choose "Complete" setup
5. Install as service
6. Click "Install MongoDB Compass" (GUI tool)

### Step 2: Start MongoDB Service

**Windows:**
```bash
# MongoDB starts automatically after installation
# Or manually:
net start MongoDB
```

**Check if running:**
```bash
mongo --version
```

### Step 3: Connection String for Local

```
mongodb://localhost:27017/acadportal_db
```

(Replace `acadportal_db` with your custom name)

---

## Step 4: Update Backend .env File

### Create/Edit `backend/.env`

```env
# MongoDB Connection - PASTE YOUR CONNECTION STRING
MONGO_URI=mongodb+srv://acadportal_user:YourPassword@cluster0.xxxxx.mongodb.net/acadportal_db?retryWrites=true&w=majority

# Server Config
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5500

# Optional
JWT_SECRET=your_secret_key_here
```

**Replace:**
- `acadportal_user` → Your username
- `YourPassword` → Your password
- `cluster0.xxxxx` → Your cluster name (from connection string)
- `acadportal_db` → Your database name

---

## Step 5: Verify Connection

### Terminal Command

```bash
cd backend
npm install
node server.js
```

**Look for:**
```
MongoDB Connected ✅
Server running on port 5000
```

If you see this, connection is successful! 🎉

---

## Common Database Names

Use any of these for your custom database name:

| Option | Name | Usage |
|--------|------|-------|
| Recommended | `acadportal_db` | Main database |
| Alternative | `student_portal` | Student-focused |
| Alternative | `vit_portal` | Institution name |
| Alternative | `academics_db` | Academic focus |
| Custom | `your_custom_name` | Anything you want |

---

## 📝 Important Notes

### Don't Use These
- ❌ Old database name if migrating
- ❌ `admin` (reserved)
- ❌ `local` (reserved)
- ❌ Spaces or special characters

### Do Use These
- ✅ Meaningful names
- ✅ Lowercase letters/numbers
- ✅ Underscores or hyphens
- ✅ Names that match your project

---

## Verify Your Setup

### In MongoDB Compass (GUI Tool)

1. Open **MongoDB Compass**
2. Click **"Create New"** or paste connection string
3. Show databases
4. You should see: `acadportal_db` (or your name)
5. Click it → should see `users` collection

---

## Quick Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created (M0 free)
- [ ] Database user created with username/password
- [ ] New database created (`acadportal_db` or custom name)
- [ ] Connection string copied
- [ ] `.env` file updated with connection string
- [ ] Backend started with `node server.js`
- [ ] See "MongoDB Connected" in console

---

## Troubleshooting

### Error: "Cannot connect to MongoDB"

**Fix 1: Check .env file**
```bash
# Make sure file exists at: backend/.env
# And contains correct MONGO_URI
```

**Fix 2: Whitelist IP Address**
1. Go to MongoDB Atlas
2. Click "Security" → "Network Access"
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (for development)
5. Click "Confirm"

**Fix 3: Check Credentials**
- Username correct?
- Password has special characters? (must be URL encoded)
- Database name in connection string?

### Error: "Database name not found"

**Fix:**
1. Go to MongoDB Atlas
2. Click "Databases"
3. Verify your database exists
4. Check name is spelled correctly in .env

### Example with Special Characters in Password

If password is `Pass@Word#123`:
```
URL Encoded: Pass%40Word%23123

Connection String:
mongodb+srv://user:Pass%40Word%23123@cluster.mongodb.net/dbname
```

---

## Next Steps

1. ✅ Set up MongoDB (Atlas or Local)
2. ✅ Create new database with custom name
3. ✅ Update `.env` with connection string
4. ✅ Test connection (`node server.js`)
5. Then run frontend on `localhost:5500`
6. Signup and create test data

---

**Version**: 1.0
**Date**: April 4, 2026
