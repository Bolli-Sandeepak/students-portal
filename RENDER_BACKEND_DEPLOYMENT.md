# Deploy Backend to Render — Step-by-Step Guide

## ✅ Prerequisites

Before starting, make sure you have:
- ✅ **GitHub account** (you already have this)
- ✅ **Vercel frontend deployed** (you just did this!)
- ✅ **Code pushed to GitHub** (in `https://github.com/Bolli-Sandeepak/students-portal`)
- ✅ **MongoDB Atlas connection working** (verified earlier)

---

## 🚀 STEP 1: Go to Render.com

1. Open: **https://render.com**
2. Click **"Sign up"** (top right)
3. Choose **"Sign up with GitHub"**
4. Authorize Render to access your GitHub

---

## 🚀 STEP 2: Create a New Web Service

1. After logging in, click **"New +"** button (top right)
2. Select **"Web Service"**

---

## 🚀 STEP 3: Connect Your GitHub Repository

1. Under "GitHub Account", click **"Connect account"**
2. Look for your repository: **`students-portal`**
3. Click to select it
4. Click **"Connect"**

---

## 🚀 STEP 4: Configure the Service

Fill in the following:

### **Service Name**
```
acadportal-backend
```
(This becomes part of your URL)

### **Environment**
```
Node
```

### **Build Command**
```
npm install
```

### **Start Command**
```
npm start
```

### **Root Directory**
```
backend
```
(This is IMPORTANT! Tells Render to use the `backend` folder)

---

## 🚀 STEP 5: Add Environment Variables

Click **"Advanced"** to expand options.

Under **"Environment Variables"**, add these one by one:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://bollisandeepak:bollisandeepak123@cluster0.azloobg.mongodb.net/acadportal_db?retryWrites=true&w=majority` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `acadportal_jwt_secret_key_production_min_32_chars` |
| `DB_NAME` | `acadportal_db` |
| `CORS_ORIGIN` | `https://YOUR_VERCEL_FRONTEND_URL` |

**For CORS_ORIGIN**, go to Vercel and copy your frontend URL. It looks like:
```
https://yourproject.vercel.app
```

---

## 🚀 STEP 6: Deploy!

1. Scroll down
2. Click **"Create Web Service"**
3. Wait for deployment (usually 2-3 minutes)

---

## 📋 Deployment Started!

You'll see a screen showing:
- **Status**: `Building` → `Deploying` → `Live`
- **URL**: Something like `https://acadportal-backend.onrender.com`

Copy this URL! You'll need it soon.

---

## ✅ Verify Deployment is Successful

Once status shows **"Live"**:

1. Go to your Render URL:
   ```
   https://acadportal-backend.onrender.com/api/login
   ```

2. You should see something like:
   ```json
   {"message": "Cannot POST /api/login without body"}
   ```

3. This means the backend is running! ✅

---

## 🔄 STEP 7: Update Frontend to Use Render URL

Now you need to tell your Vercel frontend to use the Render backend.

### **In Your Local Code:**

1. Open: `frontend/api/auth.js`
2. Find this line (around line 1):
   ```javascript
   const BASE_URL = "http://localhost:5000/api";
   ```

3. Replace with your Render URL:
   ```javascript
   const BASE_URL = "https://acadportal-backend.onrender.com/api";
   ```

4. Save the file

---

### **Push to GitHub:**

```powershell
cd c:\Users\sande\Downloads\frontend-for-acd
git add .
git commit -m "Update backend API URL to Render"
git push origin main
```

---

### **Vercel Automatically Redeploys**

Once you push to GitHub:
1. Vercel sees the change
2. Automatically rebuilds and deploys
3. Takes ~1 minute

Check your Vercel project and wait for **"Deployment Successful"**.

---

## 🧪 Test the Full Stack

1. Go to your **Vercel frontend URL**
2. Try to login with:
   - Email: `student@vit.ac.in`
   - Password: `password123`

3. You should see:
   - ✅ Success message
   - ✅ Dashboard loads
   - ✅ User data displays

---

## 🐛 If It Doesn't Work

### **Check 1: Is Render Backend Running?**

Go to: `https://acadportal-backend.onrender.com/api/login`

Should show error (which means it's running). If nothing shows, check Render logs.

### **Check 2: Check Render Logs**

1. Go to Render dashboard
2. Click your service `acadportal-backend`
3. Go to **"Logs"** tab
4. Look for errors (red text)

### **Check 3: CORS Issues?**

If you see "CORS error" in browser console:
1. Go to Render dashboard
2. Click `acadportal-backend`
3. Click **"Environment"**
4. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   https://yourproject.vercel.app
   ```
5. Click **"Save"**

The service will restart automatically.

### **Check 4: MongoDB Connection?**

In Render logs, look for:
```
MongoDB Connected Successfully
```

If you don't see it, check `MONGO_URI` environment variable.

---

## ✨ You're Done!

Your backend is now live on Render! 🎉

**Summary:**
- ✅ Backend running on Render
- ✅ Frontend running on Vercel
- ✅ Database on MongoDB Atlas
- ✅ Connected together

---

## 📊 Your Production URLs

| Component | URL |
|-----------|-----|
| **Frontend** | `https://yourproject.vercel.app` |
| **Backend API** | `https://acadportal-backend.onrender.com/api` |
| **Database** | `mongodb+srv://...` (Atlas) |

---

## 🔐 Security Checklist

- ✅ Credentials NOT in GitHub (using environment variables)
- ✅ `MONGO_URI` only in Render (not in code)
- ✅ `JWT_SECRET` only in Render (not in code)
- ✅ `.env` file in `.gitignore` (not pushed to GitHub)
- ✅ CORS configured to only allow Vercel frontend

---

## 📞 Next Steps

If everything works:
1. Share your live URLs with friends/teachers
2. Test all features (signup, login, dashboard)
3. Monitor Render logs for any errors

If something breaks:
1. Check Render logs
2. Verify environment variables
3. Test with `curl` or Postman from browser console

---

## ⚡ Quick Reference: Render Dashboard

**Location of important things:**
- **Service Status**: Top right (shows "Live" or error)
- **Logs**: Left sidebar → "Logs" → Live logs show errors
- **Environment Variables**: Left sidebar → "Environment"
- **Service URL**: Settings tab (copy your URL from there)
- **Redeploy**: Left sidebar → "Manual Deploy" → "Deploy latest commit"

---

**Congratulations! Your full-stack app is now in production!** 🚀
