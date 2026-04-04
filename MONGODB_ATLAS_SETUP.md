# MongoDB Setup Guide - Complete Instructions

## What is MongoDB Atlas?

MongoDB Atlas is **cloud-hosted MongoDB** (no installation needed). Your data is stored securely in the cloud with automatic backups.

**Benefits:**
- ✅ No server setup needed
- ✅ Automatic backups
- ✅ Secure with encryption
- ✅ Free tier available (512MB storage)
- ✅ Scales as you grow

---

## Phase 1: Create MongoDB Atlas Account & Cluster

### Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Sign up with email or Google/GitHub
4. Verify email

### Step 2: Create a Cluster
1. After login, click **"Create a Cluster"**
2. Select **Free Tier** (0 cost)
3. Choose Cloud Provider: **AWS**
4. Choose Region: **ap-south-1** (Mumbai - closest to India)
5. Click **"Create Cluster"** (Wait 5-10 minutes)

### Step 3: Create Database User
1. Go to **"Database Access"** in left menu
2. Click **"Add New Database User"**
3. Fill:
   - **Username**: `bollisandeepak`
   - **Password**: `bollisandeepak123`
   - **Built-in Role**: Select `readWriteAnyDatabase`
4. Click **"Add User"**

### Step 4: Allow Network Access
1. Go to **"Network Access"** in left menu
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (at IP field)
4. Click **"Confirm"**

---

## Phase 2: Get Connection String

### Step 1: Connect to Cluster
1. Go back to **"Clusters"**
2. Click **"Connect"** button on your cluster
3. Select **"Drivers"**
4. Copy the connection string

### Step 2: Your Connection String
```
mongodb+srv://bollisandeepak:bollisandeepak123@cluster0.azloobg.mongodb.net/?retryWrites=true&w=majority
```

### Step 3: Add Database Name
Replace the `?` with your database name:
```
mongodb+srv://bollisandeepak:bollisandeepak123@cluster0.azloobg.mongodb.net/acadportal_db?retryWrites=true&w=majority
```

---

## Phase 3: Configure Backend

### Update .env File
File: `backend/.env`

```env
# MongoDB Atlas Connection (Production Database)
MONGO_URI=mongodb+srv://bollisandeepak:bollisandeepak123@cluster0.azloobg.mongodb.net/acadportal_db?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend CORS
CORS_ORIGIN=http://localhost:5500

# JWT Secret (Change in production)
JWT_SECRET=your_jwt_secret_key_min_32_chars_very_secure

# Database
DB_NAME=acadportal_db
```

**Important Notes:**
- Keep `.env` file **locally only** (NOT on GitHub)
- `.env` file already in `.gitignore` (secure)
- Each deployment needs its own `.env` with credentials

---

## Phase 4: Verify MongoDB Connection

### Test Locally
1. Start backend server:
   ```bash
   cd backend
   npm install
   node server.js
   ```

2. You should see:
   ```
   Server running on port 5000
   MongoDB Connected
   ```

### Test Connection String
If you get an error, verify:
1. Username & password are correct
2. Database name matches (acadportal_db)
3. Network access is "Allow from Anywhere"
4. Username/password have no special characters (or URL encoded)

---

## Phase 5: Create Collections (Auto-created by Models)

Your MongoDB models automatically create collections:

### Collection: `users`
Stores student profiles and credentials
```javascript
{
  _id: ObjectId,
  name: String,
  registrationNo: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `attendances`
Stores attendance records
```javascript
{
  userId: ObjectId,
  semester: Number,
  subjects: [
    {
      code: String,
      name: String,
      percentage: Number
    }
  ]
}
```

### Collection: `marks`
Stores academic marks
```javascript
{
  userId: ObjectId,
  semester: Number,
  courses: [
    {
      code: String,
      name: String,
      grade: String,
      cgpa: Number
    }
  ]
}
```

### Collection: `assignments`
Stores assignment submissions
```javascript
{
  userId: ObjectId,
  title: String,
  submittedAt: Date,
  status: String
}
```

### Collection: `notifications`
Stores notifications
```javascript
{
  userId: ObjectId,
  message: String,
  type: String,
  isRead: Boolean,
  createdAt: Date
}
```

**These are auto-created when you insert data!** ✅

---

## Phase 6: Troubleshooting

### Error: "Authentication failed"
**Solution:**
- Check username & password in MONGO_URI
- Verify user exists in MongoDB Atlas
- Check IP address is allowed (should be "Allow from Anywhere")

### Error: "Cannot connect to MongoDB"
**Solution:**
- Internet connection OK?
- MongoDB cluster running? (check Atlas dashboard)
- Port 27017 allowed? (should auto-allow for Atlas)

### Error: "Database not created"
**Solution:**
- Normal! Database auto-creates when you insert first document
- Keep `DB_NAME=acadportal_db` in .env
- Insert data via signup → database auto-creates

### Connection String Format
**Must have**:
- `mongodb+srv://` (not just `mongodb://`)
- Username & password
- Cluster address (azloobg part)
- Database name after `.net/`

---

## Phase 7: Monitoring Data

### View Collections & Data
1. Go to MongoDB Atlas dashboard
2. Click **"Collections"**
3. View your data in real-time
4. See all users, marks, attendance, assignments, notifications

### Check Collections Created
After first signup:
1. Dashboard → Collections
2. You should see:
   - ✅ acadportal_db (database)
   - ✅ users (collection)
   - ✅ Other collections as you use features

---

## Environment Variables Explained

| Variable | Value | Purpose |
|----------|-------|---------|
| `MONGO_URI` | Connection string | How backend connects to MongoDB |
| `PORT` | 5000 | Express server port |
| `NODE_ENV` | development/production | Environment type |
| `CORS_ORIGIN` | URL | Which frontend can call API |
| `JWT_SECRET` | Secret key | For session tokens |
| `DB_NAME` | acadportal_db | Database name |

---

## Security Best Practices

### ✅ DO:
- ✓ Keep `.env` file locally only
- ✓ Use strong passwords (already set)
- ✓ Never commit `.env` to GitHub
- ✓ Change JWT_SECRET in production
- ✓ Use different password for Atlas

### ❌ DON'T:
- ✗ Share `.env` file publicly
- ✗ Push credentials to GitHub
- ✗ Use simple passwords
- ✗ Share MongoDB connection string
- ✗ Allow unnecessary IP addresses

---

## What's Your Current Setup?

✅ **Already Configured:**
- MongoDB Atlas account created
- Cluster setup
- User credentials: bollisandeepak / bollisandeepak123
- Connection string in .env
- Database name: acadportal_db
- Network access allowed

✅ **Backend Ready:**
- Express server configured
- mongoose connection ready
- CORS configured for localhost
- JWT imported & ready

---

## Quick Start Checklist

```
☑️ MongoDB Atlas Account Created
☑️ Cluster Created (Free Tier)
☑️ Database User Created
☑️ Network Access Allowed
☑️ Connection String Obtained
☑️ .env File Updated
☑️ Backend Dependencies Installed (npm install)
☑️ Server Running (npm run dev or node server.js)
☑️ MongoDB Connected Message Appears
☑️ Ready to Signup/Create Data
```

---

## Testing MongoDB Connection

### Test 1: Start Server
```bash
cd backend
node server.js
```

Expected output:
```
Server running on port 5000
MongoDB Connected
```

### Test 2: Create Account
1. Open: http://localhost:5500
2. Click "Create one"
3. Fill details:
   - Name: Test Student
   - Registration: TEST123
   - Email: test@test.com
   - Password: Test@123
4. Submit signup

### Test 3: Check MongoDB
1. Go to: https://cloud.mongodb.com
2. Click Clusters → Collections
3. You should see:
   - Database: `acadportal_db`
   - Collection: `users`
   - Document with your test data! ✅

---

## Production Deployment

### For Render (Backend)
1. Add same environment variables in Render dashboard
2. Use SAME MongoDB connection string
3. Database will be shared (all environments use same data)

### For Multiple Environments
To use different databases:
- **Development**: Keep current acadportal_db
- **Production**: Create new database on Atlas (e.g., acadportal_db_prod)
- Update Render .env with production database

---

## Next Steps

1. ✅ Verify local setup is working
2. ✅ Test signup creates data in MongoDB
3. ✅ Prepare for Render deployment
4. ✅ Deploy backend to Render
5. ✅ Deploy frontend to Netlify

---

## Support

If stuck:
1. Check server is running: `node server.js`
2. Check MongoDB Connected message appears
3. Verify .env has correct MONGO_URI
4. Check username/password in MongoDB Atlas
5. Check IP address is allowed in Network Access

**You're all set!** 🚀
