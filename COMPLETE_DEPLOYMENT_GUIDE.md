# Complete Deployment Guide: AcadPortal

## Overview
- **Backend**: Deploy to Render (Node.js + Express + MongoDB)
- **Frontend**: Deploy to Netlify (Vanilla JavaScript)
- **Database**: MongoDB Atlas (Cloud)
- **Repository**: GitHub (Single Monorepo)

---

## STEP 1: Prepare GitHub Repository

Your code is already pushed! ✅
- Repository: https://github.com/Bolli-Sandeepak/acadamic_students_portal_new

---

## STEP 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub
3. Click **"New +"** → Select **"Web Service"**

### 2.2 Connect Your GitHub Repository
1. Select your GitHub repository
2. Choose **`backend`** as root directory
3. Configure settings:
   - **Name**: `acadportal-api` (or similar)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (upgraded tier if needed)

### 2.3 Add Environment Variables in Render
1. In Render dashboard, go to **Environment** section
2. Add these variables:
   ```
   MONGO_URI=mongodb+srv://bollisandeepak:bollisandeepak123@cluster0.azloobg.mongodb.net/acadportal_db?retryWrites=true&w=majority
   
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=https://your-netlify-domain.netlify.app
   JWT_SECRET=your_strong_production_jwt_secret_min_32_chars
   DB_NAME=acadportal_db
   ```

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. You'll get a URL like: `https://acadportal-api-xxxx.onrender.com`
4. **Save this URL** - used for frontend later

### 2.5 Verify Backend is Working
Go to: `https://your-render-url/api/health` (if you have a health check route)

---

## STEP 3: Update Frontend for Production

### 3.1 Update API URL
Once you have your Render backend URL, edit `frontend/api/auth.js`:

**Change:**
```javascript
const BASE_URL = "http://localhost:5000/api";
```

**To:**
```javascript
const BASE_URL = "https://your-render-backend-url.onrender.com/api";
```

### 3.2 Push Update to GitHub
```bash
cd c:\Users\sande\Downloads\frontend-for-acd
git add frontend/api/auth.js
git commit -m "Update API URL for production Render deployment"
git push origin main
```

---

## STEP 4: Deploy Frontend to Netlify

### 4.1 Create Netlify Account
1. Go to: https://netlify.com
2. Sign up with GitHub
3. Click **"New site from Git"**

### 4.2 Connect Repository & Deploy
1. **Repository**: Select your GitHub repo
2. **Branch**: `main`
3. **Base directory**: `frontend`
4. **Build command**: Leave empty (static site)
5. **Publish directory**: `frontend`
6. Click **"Deploy"**

### 4.3 Configure Site Settings
1. Go to **Site Settings**
2. Change site name to something professional (e.g., `acadportal-student`)
3. You'll get URL: `https://acadportal-student.netlify.app`

### 4.4 Update Backend CORS
Go back to your **Render dashboard**:
1. Go to Environment variables
2. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://acadportal-student.netlify.app
   ```

---

## STEP 5: Testing in Production

### 5.1 Test Signup
1. Go to: https://your-netlify-url
2. Click **"Create one"** (Signup)
3. Fill in and submit
4. Check MongoDB Atlas if user was saved

### 5.2 Test Login
1. Use credentials you just created
2. Should see dashboard

### 5.3 Verify Both Connected
- Frontend at: `https://your-netlify-url.netlify.app`
- Backend at: `https://your-render-url.onrender.com`
- Database: MongoDB Atlas `acadportal_db`

---

## Environment Variables Summary

### Local Development (.env)
```
MONGO_URI=mongodb+srv://bollisandeepak:bollisandeepak123@cluster0.azloobg.mongodb.net/acadportal_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5500
JWT_SECRET=dev_secret_key_change_in_production
DB_NAME=acadportal_db
```

### Production - Render (Set in Render Dashboard)
```
MONGO_URI=mongodb+srv://bollisandeepak:bollisandeepak123@cluster0.azloobg.mongodb.net/acadportal_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-netlify-url.netlify.app
JWT_SECRET=strong_production_secret_min_32_characters
DB_NAME=acadportal_db
```

### Production - Frontend (Update in code)
```javascript
const BASE_URL = "https://your-render-backend-url.onrender.com/api";
```

---

## File Structure (Sent to GitHub)
```
acadamic_students_portal_new/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   ├── .env (NOT pushed - keep locally)
│   └── .env.production (reference)
│
├── frontend/
│   ├── api/
│   │   ├── auth.js (UPDATE with Render URL)
│   │   ├── auth.development.js
│   │   └── auth.production.js
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
└── DEPLOYMENT_GUIDE.md
```

---

## Troubleshooting

### Backend Won't Connect
- Check MONGO_URI in Render environment variables
- Verify MongoDB Atlas user credentials
- Ensure database name is correct: `acadportal_db`

### Frontend Can't Connect to Backend
- Verify Render URL is correct in `auth.js`
- Check CORS_ORIGIN in Render environment
- Ensure Render backend is running (check logs)

### Signup Fails
- Backend logs should show error
- Check MongoDB connection
- Verify all required fields are in form

---

## Production URLs (After Deployment)

| Component | URL |
|-----------|-----|
| **Frontend** | https://acadportal-student.netlify.app |
| **Backend API** | https://acadportal-api-xxxx.onrender.com |
| **Database** | MongoDB Atlas - acadportal_db |

---

## Next Steps

1. Deploy backend to Render first ✅
2. Get Render URL
3. Update frontend auth.js with Render URL
4. Push to GitHub
5. Deploy frontend to Netlify
6. Update CORS in Render
7. Test signup/login

**Ready? Start with Render backend deployment!** 🚀
