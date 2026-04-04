# AcadPortal - Complete Architecture Guide

## Why Separate Frontend & Backend (Monorepo)?

Even though we're using Node.js, we keep them separate for these reasons:

### ✅ Benefits of Monorepo with Separate Frontend/Backend

| Benefit | Explanation |
|---------|-------------|
| **Scalability** | Backend and frontend can scale independently |
| **Deployment** | Deploy to different platforms (Render & Netlify) |
| **Performance** | Frontend is static (CDN), Backend is API only |
| **Flexibility** | Can replace frontend with React/Vue without changing backend |
| **Separation of Concerns** | Clear boundaries between logic and UI |
| **Caching** | Frontend on CDN, Backend on serverless (Render) |
| **Cost Optimization** | Each service on its optimal platform |

### ❌ Why NOT Serve Frontend from Express?

```javascript
// ❌ Old way (backend serves frontend)
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile('index.html'));
// Issues:
// - Backend down = entire app down
// - Frontend tied to backend hosting
// - Can't scale UI independently
// - Bad for large-scale apps
```

### ✅ Better Way (Current Architecture)

```
Frontend (Netlify CDN)  ←→  Backend API (Render)  ←→  Database (MongoDB)
```

This gives:
- Frontend always available (hosted on CDN)
- Backend independent (pure API)
- Database separate (cloud hosted)
- Maximum scalability

---

## 📁 Project Architecture

```
acadamic_students_portal_new/  (Monorepo on GitHub)
│
├── 📁 backend/  (Node.js + Express API)
│   ├── controllers/
│   │   ├── authController.js
│   │   └── ...other controllers
│   ├── models/
│   │   ├── User.js
│   │   ├── Attendance.js
│   │   ├── Marks.js
│   │   ├── Assignment.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── ...other routes
│   ├── server.js  (Express app entry point)
│   ├── package.json
│   ├── .env  (Local only, NOT on GitHub)
│   ├── .env.example  (Template)
│   └── .env.production  (Reference)
│
├── 📁 frontend/  (Vanilla JavaScript UI)
│   ├── api/
│   │   ├── auth.js  (Current - points to localhost)
│   │   ├── auth.development.js  (Dev reference)
│   │   └── auth.production.js  (Prod reference)
│   ├── index.html  (Main UI)
│   ├── script.js  (Business logic)
│   ├── style.css  (Styling)
│   └── assets/  (Images, etc.)
│
├── 📄 README.md  (Project overview)
├── 📄 COMPLETE_DEPLOYMENT_GUIDE.md  (How to deploy)
├── 📄 LOCAL_SETUP.md  (Local development)
├── 📄 MONGODB_SETUP.md  (Database setup)
├── .gitignore  (.env excluded, secure)
└── .git/  (Version control)
```

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                              │
│  (Frontend: index.html + script.js + style.css)             │
│  Running on: https://your-netlify-url.netlify.app          │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ HTTPS API Calls
                   │ (JSON requests/responses)
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND API (Node.js)                        │
│  (Express server: server.js + routes)                       │
│  Running on: https://your-render-url.onrender.com          │
│                                                              │
│  Routes:                                                     │
│  - POST /api/signup → Create user                           │
│  - POST /api/login → Authenticate user                      │
│  - GET /api/user/:id/profile → Get user details            │
│  - GET /api/user/:id/marks → Get academic marks            │
│  - GET /api/user/:id/attendance → Get attendance           │
│  - PUT /api/user/:id/profile → Update profile              │
│  - etc.                                                      │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ MongoDB Driver
                   │ (Document queries)
                   ▼
┌─────────────────────────────────────────────────────────────┐
│            DATABASE (MongoDB Atlas)                          │
│  Database: acadportal_db                                     │
│  Collections:                                                │
│  - users (user profiles, credentials)                       │
│  - attendance (student attendance records)                   │
│  - marks (academic marks)                                    │
│  - assignments (assignment submissions)                      │
│  - notifications (notifications)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Environment Variables Architecture

### Local Development (`backend/.env`)
```env
MONGO_URI=mongodb+srv://...  # Atlas connection
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5500
JWT_SECRET=dev_secret
DB_NAME=acadportal_db
```

**Frontend**: Uses `http://localhost:5000/api`

### Production - Render (Set in Render Dashboard)
```env
MONGO_URI=mongodb+srv://...  # Same Atlas connection
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-netlify-url.netlify.app
JWT_SECRET=strong_production_secret
DB_NAME=acadportal_db
```

**Frontend**: Uses `https://your-render-url.onrender.com/api`

---

## 📦 Files on GitHub vs Local

### ✅ Pushed to GitHub
```
✓ backend/server.js
✓ backend/controllers/
✓ backend/models/
✓ backend/routes/
✓ backend/package.json
✓ backend/.env.example (template only)
✓ backend/.env.production (reference only)
✓ frontend/index.html
✓ frontend/script.js
✓ frontend/style.css
✓ frontend/api/auth.js
✓ frontend/api/auth.development.js
✓ frontend/api/auth.production.js
✓ Documentation files
✓ .gitignore
```

### ❌ NOT Pushed (Secure)
```
✗ backend/.env (has credentials - local only)
✗ node_modules/ (huge, regenerated on `npm install`)
✗ .DS_Store (Mac files)
✗ *.log files
```

---

## 🚀 Deployment Architecture

### Development (Local)
```
Your Computer:
  Frontend: http://localhost:5500
  Backend: http://localhost:5000
  Database: MongoDB Atlas (cloud)
```

### Production
```
Netlify (Frontend CDN):
  - Static files hosted globally
  - URL: https://acadportal-student.netlify.app
  - Serves index.html, script.js, style.css
  - Calls backend API via fetch()

Render (Backend API):
  - Node.js server running 24/7
  - URL: https://acadportal-api-xxxx.onrender.com
  - Handles all business logic
  - Connects to MongoDB Atlas

MongoDB Atlas (Database):
  - Cloud hosted database
  - Database: acadportal_db
  - Collections: users, marks, attendance, etc.
  - Secure authentication built-in
```

---

## 🔑 Key API Endpoints

```javascript
// Authentication
POST   /api/signup        // Register new student
POST   /api/login         // Login with credentials

// User Profile
GET    /api/user/:id/profile          // Get profile
PUT    /api/user/:id/profile          // Update profile

// Academic Data
GET    /api/user/:id/attendance       // Get attendance %
GET    /api/user/:id/marks            // Get semester marks
GET    /api/user/:id/assignments      // Get assignments

// Dashboard
GET    /api/user/:id/dashboard        // Get all dashboard data

// Notifications
GET    /api/user/:id/notifications    // Get notifications
PUT    /api/notification/:id/read     // Mark as read
```

---

## 📊 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Vanilla JavaScript + HTML/CSS | User interface (UI) |
| **Backend** | Node.js + Express | API server, business logic |
| **Database** | MongoDB Atlas | Cloud data storage |
| **Hosting** | GitHub + Render + Netlify | Version control & deployment |
| **Authentication** | JWT + bcrypt | Secure user login |

---

## ✅ Current Status

### Completed
- ✅ Monorepo structure (frontend + backend)
- ✅ Backend API with Express
- ✅ MongoDB Atlas connection
- ✅ Database models (Users, Marks, Attendance, etc.)
- ✅ Authentication (signup/login)
- ✅ All code on GitHub
- ✅ Development environment ready
- ✅ Environment variables configured

### In Progress
- 🚀 Deploy backend to Render
- 🚀 Deploy frontend to Netlify
- 🚀 Connect everything in production

---

## 🔄 How Data Flows (Example: Signup)

```
1. User enters details in browser (Frontend)
   ↓
2. Frontend calls: POST /api/signup with JSON data
   ↓
3. Backend receives request (Express)
   ↓
4. authController validates data
   ↓
5. userModel creates new user in MongoDB
   ↓
6. Password hashed with bcrypt
   ↓
7. Response sent back to frontend with JWT token
   ↓
8. Frontend saves token, redirects to dashboard
   ↓
9. All future requests include JWT token
```

---

## 🎯 Why This Architecture?

### Clean Separation
- **Frontend** = Only UI/UX concerns
- **Backend** = Only business logic & data
- **Database** = Only data persistence

### Easy to Scale
- Add more frontend features without touching backend
- Add more API endpoints without rebuilding frontend
- Switch hosting providers independently

### Professional Best Practice
- Used by companies like:
  - Google (multiple services)
  - Netflix (separate frontend/backend)
  - Uber (API-driven architecture)
  - Airbnb (microservices pattern)

---

## 📝 Next Steps for Deployment

1. **Deploy to Render** (Backend)
   - Login to render.com
   - Connect GitHub
   - Select backend folder
   - Set environment variables
   - Deploy!

2. **Get Render URL**
   - Example: `https://acadportal-api-xxxx.onrender.com`

3. **Update Frontend** (Update auth.js)
   - Change BASE_URL to Render URL
   - Push to GitHub

4. **Deploy to Netlify** (Frontend)
   - Login to netlify.com
   - Connect GitHub
   - Select frontend folder
   - Deploy!

5. **Update CORS** (Backend)
   - Update CORS_ORIGIN in Render with Netlify URL
   - Restart backend

6. **Test** ✅
   - Go to Netlify URL
   - Try signup/login
   - Check MongoDB for saved data

---

## 🏗️ Summary

```
AcadPortal = Monorepo with 3 Layers

Layer 1: Frontend (Netlify)
         ↓ (API calls)
Layer 2: Backend (Render)
         ↓ (Database queries)
Layer 3: Database (MongoDB Atlas)

All code in ONE GitHub repository
All deploying to different platforms (best practice)
Professional, scalable, maintainable architecture ✅
```

---

**Architecture is clean and production-ready!** 🚀

Ready to deploy to Render + Netlify?
