# 🚀 Run Locally - Quick Start Guide

## Option 1: Easy - Run Everything Locally

### Prerequisites
- Node.js installed (Download from https://nodejs.org/)
- MongoDB installed locally OR use MongoDB Atlas (cloud)

---

## Setup Step 1: Install Dependencies

### Backend Setup

```bash
cd backend
npm install
```

This installs:
- express (web server)
- mongoose (database)
- cors (cross-origin)
- dotenv (environment variables)

### Frontend Setup

```bash
cd frontend
npm install
```

(Frontend doesn't need npm packages for this project - but good to have)

---

## Setup Step 2: Create `.env` File

Create file: `backend/.env`

```env
# MongoDB - Choose ONE Option below

# Option A: Local MongoDB
MONGO_URI=mongodb://localhost:27017/acadportal

# Option B: MongoDB Atlas Cloud (FREE)
# Get from: https://www.mongodb.com/cloud/atlas
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/acadportal?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

---

## Setup Step 3: Start Backend Server

### Terminal 1 - Start Backend

```bash
cd backend
node server.js
```

You should see:
```
MongoDB Connected
Server running on port 5000
```

**Backend URL: http://localhost:5000**

Test it:
- Open browser: http://localhost:5000/
- You should see: `Backend running 🚀`

---

## Setup Step 4: Start Frontend

### Open the Frontend HTML directly in Browser

**Method 1 (Simplest):**
1. Go to: `c:\Users\sande\Downloads\frontend-for-acd\frontend`
2. Right-click on `index.html`
3. Choose "Open with" → "Chrome" (or your browser)

**Frontend URL: file:///C:/Users/sande/Downloads/frontend-for-acd/frontend/index.html**

OR

**Method 2 (Using Live Server - Better):**

Install VS Code Extension:
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "Live Server"
4. Click "Install" (by Ritwick Dey)

Then:
1. Right-click on `frontend/index.html`
2. Choose "Open with Live Server"
3. Browser opens automatically with live reload

**Frontend URL: http://localhost:5500**

OR

**Method 3 (Using Python):**

```bash
cd frontend
python -m http.server 8000
```

**Frontend URL: http://localhost:8000**

---

## Update API URL for Local Testing

Edit: `frontend/api/auth.js`

Change this line:
```javascript
const BASE_URL = "http://localhost:5000/api";
```

(For local development)

---

## 🧪 Test Locally

### Terminal Setup:
```
Terminal 1: cd backend → node server.js (KEEP RUNNING)
Terminal 2: Use for other commands
```

### Test Steps:

1. **Open Frontend**
   - http://localhost:5500 (or your localhost URL)
   - You should see login page

2. **Create Test Account**
   - Click "Create one" (signup)
   - Fill form:
     - Name: Test Student
     - Reg: 21BCE1234
     - Email: test@test.com
     - Password: test123456
   - Click "Create Account"

3. **Login**
   - Enter: test@test.com or 21BCE1234
   - Password: test123456
   - Click "Sign In"

4. **Verify Dashboard**
   - You should see: "Good Morning, Test Student!"
   - Sidebar shows your name
   - All data is from database

5. **Test Other Pages**
   - Click "Student Profile"
   - Click "Attendance"
   - Click "Marks"
   - Click "Assignments"
   - Click "Notifications"

---

## 📱 Test Responsive Design

**In Browser DevTools (F12):**

1. Press F12 (opens Developer Tools)
2. Press Ctrl+Shift+M (toggles device toolbar)
3. Test at different sizes:
   - iPhone 12: 390px width
   - iPad: 768px width
   - Desktop: 1920px width

**Check:**
- [ ] Sidebar becomes drawer on mobile
- [ ] Text is readable
- [ ] Buttons work on touch
- [ ] No horizontal scroll

---

## ✅ Verify Everything Works

### Backend Tests

Open new Terminal:
```bash
# Test signup
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","regNo":"123","email":"test@test.com","password":"test123"}'

# Test login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"emailOrReg":"test@test.com","password":"test123"}'
```

### Browser Console Tests

Open Browser Console (F12 → Console):
```javascript
// Test API call
const BASE_URL = "http://localhost:5000/api";
fetch(`${BASE_URL}/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ emailOrReg: "test@test.com", password: "test123" })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

---

## 🔧 Troubleshooting

### Error: "Cannot find module 'express'"
**Fix:**
```bash
cd backend
npm install
```

### Error: "ECONNREFUSED - Cannot connect to MongoDB"
**Fix - Option 1: Use Local MongoDB**
- Install: https://www.mongodb.com/try/download/community
- Start: `mongod` (another terminal)

**Fix - Option 2: Use MongoDB Atlas**
- Create account: https://www.mongodb.com/cloud/atlas
- Get connection string
- Update MONGO_URI in `.env`

### Error: "Port 5000 already in use"
**Fix:**
```bash
# Use different port
PORT=5001 node server.js
```

### Error: "CORS error" in console
**Fix:**
- Make sure `CORS_ORIGIN=http://localhost:3000` in `.env`
- Restart backend
- Refresh frontend

### Data not showing after login
**Check:**
1. Open F12 → Network tab
2. Look for API calls
3. Check if they have response
4. Check browser console for errors

---

## 📊 Local URLs Reference

| Service | URL | Port |
|---------|-----|------|
| Backend API | http://localhost:5000 | 5000 |
| Backend API Endpoints | http://localhost:5000/api/* | 5000 |
| Frontend (File) | file:///C:/Users/sande/.../frontend/index.html | N/A |
| Frontend (Live Server) | http://localhost:5500 | 5500 |
| Frontend (Python) | http://localhost:8000 | 8000 |
| MongoDB (Local) | mongodb://localhost:27017 | 27017 |

---

## 🎯 Quick Command Reference

### Start Backend
```bash
cd backend
node server.js
```

### Start Frontend (VS Code Live Server)
Right-click `index.html` → "Open with Live Server"

### Test in Browser
```
http://localhost:5500  (or 8000, or 5500 depending on method)
```

### Update API for Local
Edit `frontend/api/auth.js`:
```javascript
const BASE_URL = "http://localhost:5000/api";
```

### View Logs
Backend console shows all requests and errors

---

## 🚀 What to Test Locally

- [ ] **Signup** - Create new account
- [ ] **Login** - Login with credentials
- [ ] **Logout** - Clear session
- [ ] **Dashboard** - Shows user data
- [ ] **Profile** - Shows your info
- [ ] **Attendance** - Shows table
- [ ] **Marks** - Show semesters
- [ ] **Dark Mode** - Toggle works
- [ ] **Mobile View** - Responsive works
- [ ] **Notifications** - Filters work
- [ ] **Assignments** - Upload file

---

## 📱 Mobile Testing Locally

### Test on Phone (Same Network):

1. Find your computer IP:
   ```bash
   ipconfig
   # Look for IPv4 Address like: 192.168.1.100
   ```

2. On phone browser, go to:
   ```
   http://192.168.1.100:5500
   ```
   (Replace IP with yours)

3. Test responsiveness on actual phone

---

## 💾 MongoDB Atlas Setup (Recommended)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" (free tier)
3. Create cluster (M0 free)
4. Get connection string
5. Copy to `.env` file:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/acadportal?retryWrites=true&w=majority
   ```
6. Restart backend

---

## ✨ You're Ready!

Now you can:
- ✅ Run backend locally
- ✅ Run frontend locally
- ✅ Test everything
- ✅ Make changes and see live updates
- ✅ Then deploy to production

**Next Steps:**
1. Test locally (this guide)
2. Make sure everything works
3. Then follow DEPLOYMENT_GUIDE.md to go live on Render + Netlify

---

**Version**: 1.0 - Local Development
**Date**: April 4, 2026
