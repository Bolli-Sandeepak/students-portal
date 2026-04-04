# Deploy to Render - Complete Step-by-Step Guide

## What is Render?

**Render** is a modern cloud platform where you can deploy your backend for free!

- ✅ Free tier available
- ✅ Auto-deploys from GitHub
- ✅ MongoDB Atlas compatible
- ✅ 24/7 uptime
- ✅ Easy environment variables
- ✅ One-click deployments

---

## 🚀 Step 1: Prepare Your GitHub Repository

### ✅ Already Done!
Your code is on GitHub:
- **Repository**: https://github.com/Bolli-Sandeepak/acadamic_students_portal_new
- **Backend folder**: Ready to deploy
- **Frontend folder**: Ready for Netlify (after this)

---

## 🚀 Step 2: Create Render Account

### 2.1 Sign Up
1. Go to: https://render.com
2. Click **"Sign Up"**
3. Choose: **Sign up with GitHub**
4. Authorize GitHub access
5. Verify email

### 2.2 Connect GitHub Account
1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Click **"Connect account"** (GitHub)
4. Authorize Render to access your repos
5. Select your repository: `acadamic_students_portal_new`

---

## 🚀 Step 3: Create Web Service

### 3.1 Basic Settings
1. **Name**: `acadportal-api` (or your choice)
2. **Environment**: Select **Node**
3. **Region**: Select **Singapore** (or closest to you)
4. **Branch**: **main**
5. **Root Directory**: **backend** ← IMPORTANT!

### 3.2 Build & Start Commands
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

### 3.3 Plan Selection
- Select **Free** (sufficient for development)
- Can upgrade later if needed

### 3.4 Click "Create Web Service"
Render will now build and deploy your backend!

---

## 🚀 Step 4: Add Environment Variables

### 4.1 Wait for Deployment to Start
After clicking "Create", Render will:
1. Clone your GitHub repo
2. Install dependencies
3. Deploy your backend

**Wait for this to complete** (2-5 minutes)

### 4.2 Add Environment Variables
Once deployed:

1. Go to **Settings** tab
2. Scroll to **Environment**
3. Click **"Add Environment Variable"**
4. Add these variables:

```
MONGO_URI
mongodb+srv://bollisandeepak:bollisandeepak123@cluster0.azloobg.mongodb.net/acadportal_db?retryWrites=true&w=majority

PORT
5000

NODE_ENV
production

CORS_ORIGIN
https://your-netlify-url.netlify.app
(Update after Netlify deployment)

JWT_SECRET
strong_production_secret_min_32_chars_acadportal_2024

DB_NAME
acadportal_db
```

### 4.3 Save Environment Variables
- Click **"Save Changes"**
- Render will restart your backend with new variables

---

## 🚀 Step 5: Get Your Render URL

### 5.1 Find Your URL
1. Go to **Settings** tab in Render
2. Look for **"Service URL"**
3. Copy the URL (e.g., `https://acadportal-api-xxxx.onrender.com`)
4. **Save this URL** - you'll need it for frontend!

### 5.2 Test Backend is Running
1. Go to: `https://your-render-url/` 
2. You should see: **"Backend running 🚀"**
3. If you see this, backend is deployed! ✅

---

## 🚀 Step 6: Update Frontend with Backend URL

### 6.1 Update auth.js
File: `frontend/api/auth.js`

**Change**:
```javascript
const BASE_URL = "http://localhost:5000/api";
```

**To**:
```javascript
const BASE_URL = "https://your-render-url.onrender.com/api";
```

**Example**:
```javascript
const BASE_URL = "https://acadportal-api-xxxx.onrender.com/api";
```

### 6.2 Commit & Push to GitHub
```bash
cd c:\Users\sande\Downloads\frontend-for-acd
git add frontend/api/auth.js
git commit -m "Update API URL to Render production backend"
git push origin main
```

---

## 🚀 Step 7: Deploy Frontend to Netlify

### 7.1 Create Netlify Account
1. Go to: https://netlify.com
2. Click **"Sign up"**
3. Choose: **Sign up with GitHub**
4. Authorize GitHub

### 7.2 Create New Site
1. Click **"New site from Git"**
2. Select **GitHub** as Git provider
3. Authorize Netlify
4. Select your repository: `acadamic_students_portal_new`

### 7.3 Configure Deployment
1. **Branch**: **main**
2. **Base directory**: **frontend**
3. **Build command**: Leave empty (static site)
4. **Publish directory**: **frontend**
5. Click **"Deploy"**

Netlify will now deploy your frontend!

### 7.4 Get Your Netlify URL
1. Wait for deployment complete
2. Copy your site URL (e.g., `https://acadportal-student.netlify.app`)
3. **Save this URL**

---

## 🚀 Step 8: Update CORS in Render

### 8.1 Go Back to Render
1. Dashboard → Your Web Service
2. Go to **Settings**
3. Find **Environment** section
4. Edit **CORS_ORIGIN**

### 8.2 Update Value
**Change**:
```
https://your-netlify-url.netlify.app
```

**To**:
```
https://your-actual-netlify-url.netlify.app
```

**Example**:
```
https://acadportal-student.netlify.app
```

### 8.3 Save Changes
- Render will restart your backend
- Backend can now accept requests from your frontend

---

## ✅ Verify Everything Works

### Test 1: Check Render Backend
1. Go to: `https://your-render-url/`
2. You should see: **"Backend running 🚀"**

### Test 2: Check Netlify Frontend
1. Go to: `https://your-netlify-url.netlify.app`
2. You should see the AcadPortal login page

### Test 3: Test Signup
1. On Netlify frontend, click **"Create one"**
2. Fill in details:
   - Name: Test Student
   - Registration: TEST123
   - Email: test@test.com
   - Password: TestPass123
3. Click **Submit**
4. Should see success message

### Test 4: Check MongoDB Data
1. Go to: https://cloud.mongodb.com/v2/686a739ee9765d2a86e24eec
2. Click **Collections**
3. You should see:
   - Database: `acadportal_db`
   - Collection: `users`
   - Your test user! ✅

### Test 5: Test Login
1. Go back to frontend
2. Login with email & password you just created
3. Should see dashboard

---

## 🎯 Your Production URLs

After deployment, you'll have:

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | https://acadportal-student.netlify.app | Live on CDN |
| **Backend API** | https://acadportal-api-xxxx.onrender.com | Live serverless |
| **Database** | MongoDB Atlas (acadportal_db) | Cloud hosted |

---

## 🔍 Monitoring & Troubleshooting

### View Render Logs
1. Render Dashboard → Your Web Service
2. Click **"Logs"** tab
3. See real-time logs of your backend
4. Helpful for debugging errors

### Common Issues

#### Issue: "Cannot POST /api/signup"
**Solution:** 
- Check CORS_ORIGIN in Render matches your Netlify URL
- Check backend restarted after CORS update

#### Issue: "MongoDB connection failed"
**Solution:**
- Check MONGO_URI in Render environment
- Verify MongoDB Atlas network access allows Render IP
- Check database user credentials

#### Issue: "Backend not responding"
**Solution:**
- Check Render logs for errors
- Verify all environment variables are set
- Restart service: Settings → Restart Instance

#### Issue: "Frontend can't reach backend"
**Solution:**
- Verify backend URL in frontend/api/auth.js
- Check CORS_ORIGIN in Render includes your Netlify URL
- Check backend is actually running

---

## 📊 Deployment Checklist

```
RENDER SETUP:
  ☑️ Render account created
  ☑️ GitHub connected
  ☑️ Web Service created
  ☑️ Root directory set to 'backend'
  ☑️ Build & start commands configured
  ☑️ Environment variables added
  ☑️ Service deployed & running
  ☑️ Render URL obtained

NETLIFY SETUP:
  ☑️ Netlify account created
  ☑️ GitHub connected
  ☑️ New site from Git created
  ☑️ Base directory set to 'frontend'
  ☑️ Site deployed
  ☑️ Netlify URL obtained

CONFIGURATION:
  ☑️ Frontend auth.js updated with Render URL
  ☑️ Code pushed to GitHub
  ☑️ Render CORS_ORIGIN updated with Netlify URL
  ☑️ Render backend restarted

TESTING:
  ☑️ Backend responding (test root route)
  ☑️ Frontend loading (Netlify URL)
  ☑️ Signup working (data in MongoDB)
  ☑️ Login working (dashboard loads)
  ☑️ Full flow tested end-to-end
```

---

## 🎯 What You Have Now

```
Production Environment:

┌─────────────────────────────────────────────────────┐
│  FRONTEND (Netlify CDN)                            │
│  https://acadportal-student.netlify.app            │
│  - Global distribution                             │
│  - Lightning fast                                  │
│  - Always available                                │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ HTTPS API Calls
                   │
┌──────────────────▼──────────────────────────────────┐
│  BACKEND (Render Serverless)                       │
│  https://acadportal-api-xxxx.onrender.com          │
│  - Auto-scaling                                    │
│  - 24/7 uptime                                     │
│  - Zero maintenance                                │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ MongoDB Queries
                   │
┌──────────────────▼──────────────────────────────────┐
│  DATABASE (MongoDB Atlas)                          │
│  Cloud Hosted MongoDB                              │
│  - Secure encryption                               │
│  - Automatic backups                               │
│  - Global access                                   │
└─────────────────────────────────────────────────────┘

RESULT: Professional, scalable, production-ready app! ✅
```

---

## 🚀 After Successful Deployment

1. **Share Your App**
   - Frontend URL: `https://your-netlify-url.netlify.app`
   - Share with friends/college

2. **Create Real Data**
   - Sign up multiple students
   - Add marks, attendance, assignments
   - Test all features

3. **Monitor Performance**
   - Check Render logs
   - Monitor MongoDB storage
   - Track uptime

4. **Future Improvements**
   - Add more API endpoints
   - Add more features to frontend
   - Optimize performance

---

## ✨ Congratulations!

Your app is now:
- ✅ Live on the internet
- ✅ Accessible 24/7
- ✅ Connected to MongoDB
- ✅ Using professional infrastructure
- ✅ Ready for real users

**You've built and deployed a full-stack application!** 🎉

---

## 📞 Need Help?

**Common links:**
- Render Status: https://status.render.com
- Render Docs: https://render.com/docs
- Netlify Status: https://www.netlifystatus.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas

**Check logs:**
- Render: Dashboard → Logs tab
- Netlify: Deploy → Open logs
- MongoDB: Cluster → Monitoring

---

**Ready to deploy? Start with Render!** 🚀

1. Go to https://render.com
2. Sign up with GitHub
3. Create Web Service
4. Follow steps above
5. Your backend is live!

Then deploy frontend to Netlify, and you're done! 🎉
