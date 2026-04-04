# 🚀 Complete Deployment Guide

## Part 1: Backend Deployment on Render

### Step 1: Prepare Backend for Production

#### 1.1 Create `.env` file in backend folder

```
cd backend
```

Create file: `backend/.env`

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/acadportal?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=production

# CORS
CORS_ORIGIN=https://your-frontend-url.netlify.app

# Optional: Add other configs
JWT_SECRET=your_jwt_secret_key_here
```

**Where to get MongoDB connection string:**
1. Go to https://www.mongodb.com/cloud/atlas (Free)
2. Create account → Create cluster (M0 free tier)
3. Get connection string
4. Replace username:password with your credentials

#### 1.2 Update backend Server file

In `backend/server.js`, make sure CORS is properly configured:

```javascript
const cors = require("cors");

// Configure CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));
```

#### 1.3 Create `.gitignore` in backend

```
node_modules/
.env
.env.local
.env.*.local
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

#### 1.4 Update `package.json` in backend

Make sure it has:

```json
{
  "name": "acadportal-backend",
  "version": "1.0.0",
  "description": "AcadPortal Student Portal Backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["student", "portal", "academic"],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

---

### Step 2: Deploy to Render

#### 2.1 Create Render Account

1. Go to https://render.com
2. Sign up (free plan available)
3. Verify email

#### 2.2 Connect GitHub Repository

**Option A: Using GitHub (Recommended)**

1. Push backend code to GitHub:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit - AcadPortal Backend"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/acadportal-backend.git
   git push -u origin main
   ```

2. Go to https://render.com/dashboard
3. Click "New +" → "Web Service"
4. Connect your GitHub account
5. Select `acadportal-backend` repository
6. Choose the branch: `main`

#### 2.3 Configure Web Service on Render

**Fill in these details:**

| Field | Value |
|-------|-------|
| **Name** | acadportal-backend |
| **Environment** | Node |
| **Region** | Virginia (or closest to you) |
| **Branch** | main |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |

#### 2.4 Add Environment Variables on Render

1. Scroll down to "Environment"
2. Add each variable:

```
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/acadportal?retryWrites=true&w=majority

CORS_ORIGIN=https://your-netlify-frontend.netlify.app

PORT=5000

NODE_ENV=production
```

#### 2.5 Deploy

1. Click "Create Web Service"
2. Wait for build to complete (2-5 minutes)
3. You'll see a live URL like: `https://acadportal-backend.onrender.com`
4. **Save this URL** - you'll need it for frontend!

#### 2.6 Verify Backend is Running

Open in browser:
```
https://acadportal-backend.onrender.com/
```

You should see: `Backend running 🚀`

---

## Part 2: Update Frontend API URL

### Step 3: Configure Frontend API URL

Now update your frontend to use the Render backend URL.

#### 3.1 Update `frontend/api/auth.js`

Replace the `BASE_URL`:

**BEFORE:**
```javascript
const BASE_URL = "https://students-portal-h6hh.onrender.com/api";
```

**AFTER:**
```javascript
const BASE_URL = "https://acadportal-backend.onrender.com/api";
// Replace with YOUR actual Render URL from Step 2.5
```

**Complete file should look like:**
```javascript
const BASE_URL = "https://acadportal-backend.onrender.com/api";

export async function signupUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}

// ... rest of functions
```

#### 3.2 Verify the URL Works

1. Open browser DevTools (F12)
2. Go to Console tab
3. Run:
   ```javascript
   fetch('https://acadportal-backend.onrender.com/')
       .then(r => r.text())
       .then(console.log)
   ```
4. You should see: `"Backend running 🚀"`

---

## Part 3: Frontend Deployment on Netlify

### Step 4: Prepare Frontend for Netlify

#### 4.1 Create Project Structure

Make sure frontend folder has:
```
frontend/
├── index.html
├── style.css
├── script.js
├── api/
│   └── auth.js
└── README.md (optional)
```

#### 4.2 Create Netlify Deploy Files

**Create `frontend/netlify.toml`:**

```toml
[build]
  command = "echo 'No build required - static files only'"
  publish = "/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "echo 'Open index.html in your browser'"
  targetPort = 3000
```

**Create `frontend/_redirects`:**

```
/*  /index.html  200
```

#### 4.3 Create `.gitignore` in frontend

```
node_modules/
.DS_Store
*.log
.env
.env.local
.cache
dist/
build/
```

---

### Step 5: Deploy Frontend to Netlify

#### 5.1 Create Netlify Account

1. Go to https://netlify.com
2. Sign up (free account)
3. Verify email

#### 5.2 Connect GitHub (Option A - Recommended)

**Push frontend to GitHub:**

```bash
cd frontend
git init
git add .
git commit -m "Initial commit - AcadPortal Frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/acadportal-frontend.git
git push -u origin main
```

**Deploy on Netlify:**

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub
4. Authorize & choose your `acadportal-frontend` repo
5. Configure:
   - **Base directory**: `frontend/`
   - **Build command**: (leave empty - no build needed)
   - **Publish directory**: `frontend/`

#### 5.2 Alternative: Manual Upload (Option B)

If you don't want to use GitHub:

1. Go to https://app.netlify.com/drop
2. Drag the entire `frontend` folder
3. Your site will be live in seconds!
4. Get your site name like: `https://name.netlify.app`

#### 5.3 Configure Custom Domain (Optional)

1. In Netlify → Site settings → Domain management
2. Add custom domain (costs ~$0-15/year)
3. Update CORS in Render if using custom domain

---

## Part 4: Final Configuration & Testing

### Step 6: Update Backend CORS Setting

Update `CORS_ORIGIN` in Render environment variables:

**If using Netlify subdomain:**
```
https://your-site-name.netlify.app
```

**If using custom domain:**
```
https://yourdomain.com
```

Steps:
1. Go to Render → acadportal-backend
2. Click "Environment"
3. Edit `CORS_ORIGIN`
4. Save (auto-redeploys)

### Step 7: Test Everything

#### 7.1 Test Backend API

```bash
# Test login endpoint
curl -X POST https://acadportal-backend.onrender.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"emailOrReg":"test@test.com","password":"test123"}'
```

#### 7.2 Test Frontend

1. Open https://your-site.netlify.app/
2. Verify you see AcadPortal login page
3. Signup with test credentials
4. Check browser console (F12) for network requests
5. Verify data loads from backend

#### 7.3 Test from Mobile

1. Open on phone/tablet
2. Test responsive design
3. Verify all pages work

---

## Part 5: Troubleshooting

### Problem: "Network error" on login

**Solution:**
1. Check `BASE_URL` in `frontend/api/auth.js` is correct
2. Verify backend is running: `https://your-backend.onrender.com/`
3. Check CORS setting in Render environment
4. Clear browser cache (Ctrl+Shift+Delete)

### Problem: Backend request takes 10+ seconds

**Solution:**
- Render free tier spins down after 15 min of inactivity
- First request after inactivity is slow
- Upgrade to paid plan to keep running

### Problem: "CORS error" in console

**Solution:**
1. Update `CORS_ORIGIN` in Render .env
2. Make sure correct frontend URL is used
3. Wait 1-2 minutes for Render to redeploy
4. Hard refresh in browser (Ctrl+Shift+R)

### Problem: Looks different on mobile

**Solution:**
1. Check CSS media queries are working
2. Open DevTools (F12) → Device toolbar
3. Test at 600px, 768px widths
4. Check `<meta name="viewport">` in HTML

---

## Part 6: Keep Links Updated

### Whenever Backend URL Changes

Edit `frontend/api/auth.js`:

```javascript
// CHANGE THIS LINE:
const BASE_URL = "https://acadportal-backend.onrender.com/api";
```

### Environment Variables Method (Better)

Create `frontend/_env` file:

```
REACT_APP_API_URL=https://acadportal-backend.onrender.com/api
```

Then use in script:
```javascript
const BASE_URL = window._env?.REACT_APP_API_URL || "https://acadportal-backend.onrender.com/api";
```

---

## Part 7: Monitoring & Maintenance

### Monitor Backend on Render

1. Go to Render dashboard
2. Check "Logs" for errors
3. View "Metrics" for uptime
4. Monitor database connections

### Monitor Frontend on Netlify

1. Go to Netlify site
2. Check "Deploys" history
3. View "Analytics" for traffic
4. Monitor error reports

### Seed Test Data (Optional)

Create `backend/seed.js`:

```javascript
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

async function seedData() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const user = await User.create({
    name: "Test Student",
    regNo: "21BCE1234",
    email: "test@example.com",
    password: "test123456",
    semester: 6,
    cgpa: 8.76,
    attendancePercentage: 87
  });
  
  console.log("Test user created:", user);
  process.exit(0);
}

seedData().catch(err => {
  console.error(err);
  process.exit(1);
});
```

Run: `node seed.js`

---

## 🎯 Quick Checklist

### Before Going Live

- [ ] Backend deployed to Render
- [ ] Backend URL copied
- [ ] Frontend `BASE_URL` updated
- [ ] CORS configured correctly
- [ ] Test login works
- [ ] Test all pages load data
- [ ] Test on mobile (responsive)
- [ ] Check console for errors
- [ ] MongoDB Atlas connected
- [ ] Environment variables set

### Deployment Commands

```bash
# Backend
cd backend
npm install
# Push to GitHub
git push

# Frontend  
cd frontend
# Push to GitHub
git push
# Or drag to Netlify
```

---

## 📞 Need Help?

| Issue | Check |
|-------|-------|
| "Cannot find module" | Run `npm install` in backend |
| Backend 503 error | Check MongoDB MONGO_URI in .env |
| CORS error | Update CORS_ORIGIN in Render |
| Page not loading | Check api/auth.js has correct BASE_URL |
| Forms don't work | Open F12 → Network tab, check API calls |

---

**Version**: 2.0 - Production Ready
**Last Updated**: April 4, 2026
