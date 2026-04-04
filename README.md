# 🎓 AcadPortal - Student Academic Portal

A complete, professional Student Academic Portal application built with modern web technologies. Students can track attendance, view marks, submit assignments, manage fees, and more - all in one platform.

**Status**: ✅ Development Complete | 🚀 Ready for Production Deployment

---

## 📌 Quick Links

- **GitHub Repository**: https://github.com/Bolli-Sandeepak/acadamic_students_portal_new
- **Live Frontend**: (Deploying to Netlify)
- **Live Backend API**: (Deploying to Render)
- **Database**: MongoDB Atlas (Cloud)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (Netlify)                                     │
│  Vanilla JS + HTML/CSS                                  │
│  URL: https://your-netlify-url.netlify.app             │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP/HTTPS
                  │ JSON API Calls
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Backend API (Render)                                   │
│  Node.js + Express                                      │
│  URL: https://your-render-url.onrender.com             │
└─────────────────┬───────────────────────────────────────┘
                  │ MongoDB Driver
                  │ Document Operations
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Database (MongoDB Atlas)                               │
│  Cloud Hosted Database                                  │
│  Database: acadportal_db                                │
└─────────────────────────────────────────────────────────┘
```

**Why Separate Frontend & Backend?**
- Scalability (each layer scales independently)
- Flexibility (can replace frontend without changing backend)
- Deployment (use best platform for each - CDN for frontend, serverless for backend)
- Performance (frontend cached on CDN, backend optimized for APIs)

---

## 🎯 Features

### Student Features
- ✅ **Authentication**: Secure signup/login with JWT
- ✅ **Dashboard**: Overview of academic metrics
- ✅ **Profile**: View & update student information
- ✅ **Attendance**: Track attendance per subject
- ✅ **Marks**: View semester-wise marks & grades
- ✅ **Assignments**: View & submit assignments
- ✅ **Hostel**: View hostel details & roommate info
- ✅ **Fees**: View fee breakdown & payment history
- ✅ **Leave**: Apply for & track leave requests
- ✅ **Notifications**: Receive academic updates

### UI/UX Features
- ✅ **Dark Mode**: Toggle between light & dark themes
- ✅ **Responsive Design**: Works on desktop, tablet, mobile
- ✅ **Real-time Charts**: Visual representation of marks & attendance
- ✅ **Professional UI**: Modern, clean, student-friendly design

---

## 🗂️ Project Structure

```
acadamic_students_portal_new/
│
├── 📁 backend/                          # Node.js Express API
│   ├── controllers/
│   │   └── authController.js            # Authentication logic
│   ├── models/
│   │   ├── User.js                      # User schema
│   │   ├── Attendance.js                # Attendance records
│   │   ├── Marks.js                     # Grade records
│   │   ├── Assignment.js                # Assignment data
│   │   └── Notification.js              # Notifications
│   ├── routes/
│   │   └── authRoutes.js                # API endpoints
│   ├── server.js                        # Express app
│   ├── package.json                     # Dependencies
│   ├── .env                             # Environment (local only)
│   ├── .env.example                     # Template
│   └── .env.production                  # Production reference
│
├── 📁 frontend/                         # Vanilla JavaScript UI
│   ├── api/
│   │   ├── auth.js                      # API client (localhost)
│   │   ├── auth.development.js          # Dev reference
│   │   └── auth.production.js           # Prod reference
│   ├── index.html                       # Main HTML
│   ├── script.js                        # Business logic
│   ├── style.css                        # Styling
│   └── assets/                          # Images & fonts
│
├── 📄 README.md                         # This file
├── 📄 ARCHITECTURE.md                   # Complete architecture guide
├── 📄 COMPLETE_DEPLOYMENT_GUIDE.md      # How to deploy
├── 📄 LOCAL_SETUP.md                    # Local development
├── 📄 MONGODB_SETUP.md                  # Database setup
├── .gitignore                           # Git ignore rules
└── .git/                                # Version control
```

---

## 💻 Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | Vanilla JavaScript, HTML5, CSS3 | User Interface |
| **Backend** | Node.js, Express.js | REST API Server |
| **Database** | MongoDB Atlas | Cloud Data Storage |
| **Authentication** | JWT, bcrypt | Secure Authentication |
| **Version Control** | Git, GitHub | Code Management |
| **Hosting** | Netlify (Frontend), Render (Backend) | Deployment |

---

## 🚀 Getting Started

### Local Development

#### 1. Clone Repository
```bash
git clone https://github.com/Bolli-Sandeepak/acadamic_students_portal_new.git
cd acadamic_students_portal_new
```

#### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file in `backend/` folder:
```env
MONGO_URI=mongodb+srv://bollisandeepak:bollisandeepak123@cluster0.azloobg.mongodb.net/acadportal_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5500
JWT_SECRET=dev_secret_key_change_in_production
DB_NAME=acadportal_db
```

Start backend:
```bash
node server.js
```
Backend runs at `http://localhost:5000`

#### 3. Setup Frontend
Open another terminal:
```bash
cd frontend
python -m http.server 5500
# OR use Live Server extension in VS Code
```
Frontend runs at `http://localhost:5500`

#### 4. Test
- Open `http://localhost:5500` in browser
- Create new account (Signup)
- Check MongoDB Atlas for saved data
- Login with credentials

---

## 📊 API Endpoints

### Authentication
```
POST   /api/signup           // Register new student
POST   /api/login            // Login
```

Request Body (Signup):
```json
{
  "name": "Arjun Sharma",
  "registrationNo": "21BCE1234",
  "email": "arjun@student.ac.in",
  "password": "SecurePassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### User Profile
```
GET    /api/user/:id/profile           // Get profile
PUT    /api/user/:id/profile           // Update profile
```

### Academic Data
```
GET    /api/user/:id/attendance        // Get attendance
GET    /api/user/:id/marks             // Get marks
GET    /api/user/:id/assignments       // Get assignments
GET    /api/user/:id/dashboard         // Get dashboard data
```

---

## 🔐 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  registrationNo: String,
  email: String,
  password: String (hashed),
  profilePicture: String,
  dob: Date,
  bloodGroup: String,
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  semester: Number,
  subjects: [
    {
      code: String,
      name: String,
      conducted: Number,
      attended: Number,
      percentage: Number
    }
  ],
  overallAttendance: Number
}
```

### Marks Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  semester: Number,
  courses: [
    {
      code: String,
      name: String,
      credits: Number,
      internal: Number,
      external: Number,
      total: Number,
      grade: String
    }
  ],
  sgpa: Number,
  cgpa: Number
}
```

---

## 📦 Environment Variables

### Development (.env)
```
MONGO_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5500
JWT_SECRET=dev_secret_key
DB_NAME=acadportal_db
```

### Production (Render Dashboard)
```
MONGO_URI=mongodb+srv://...
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://netlify-url
JWT_SECRET=strong_production_secret
DB_NAME=acadportal_db
```

---

## 🎨 Features in Detail

### Dashboard
- Student name & registration number
- CGPA & current semester
- Attendance percentage
- Pending tasks count
- Semester performance chart
- Subject attendance breakdown
- Recent activity feed
- Upcoming events

### Student Profile
- Personal information (name, DOB, phone, address)
- Academic information (program, branch, specialization)
- Profile picture (avatar API)
- Edit functionality

### Academic Records
- Semester-wise SGPA breakdown
- Cumulative CGPA tracking
- Credits earned & registered
- Overall academic status

### Attendance
- Subject-wise attendance percentages
- Total classes conducted & attended
- Minimum required attendance (75%)
- Classes allowed to miss calculation

### Marks
- Semester-wise grade view
- Course-wise marks (internal, external, total)
- Grade point calculation
- SGPA & CGPA computation

### Hostel
- Room number & block details
- Floor & room type
- Check-in/check-out dates
- Warden contact information
- Roommate details
- Amenities list

### Fees
- Semester fee breakdown
- Payment history
- Current payment status
- Upcoming fees information
- Payment methods

### Assignments
- List of submitted assignments
- Upload functionality
- Submission dates
- Assignment status

---

## 🚀 Production Deployment

### Deploy Backend to Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Root directory: `backend`
5. Build: `npm install`
6. Start: `node server.js`
7. Add environment variables
8. Deploy!

**Get Render URL** (format: `https://xxxxx.onrender.com`)

### Deploy Frontend to Netlify
1. Go to https://netlify.com
2. Create new site from Git
3. Repository: your GitHub repo
4. Base: `frontend`
5. Deploy!

**Get Netlify URL** (format: `https://xxxxx.netlify.app`)

### Update Configuration
1. Update `frontend/api/auth.js` with Render URL
2. Update `CORS_ORIGIN` in Render with Netlify URL
3. Push changes to GitHub

**For detailed deployment steps, see COMPLETE_DEPLOYMENT_GUIDE.md**

---

## 🧪 Testing

### Signup Test
1. Open frontend app
2. Click "Create one"
3. Fill in student details
4. Submit
5. Check MongoDB Atlas for saved user

### Login Test
1. Use credentials from signup
2. Should see dashboard
3. Verify user data loads

### API Test
Use Postman or curl:
```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'
```

---

## 📝 Documentation

- **README.md** (this file) - Project overview
- **ARCHITECTURE.md** - Complete architecture explanation
- **COMPLETE_DEPLOYMENT_GUIDE.md** - Deployment instructions
- **LOCAL_SETUP.md** - Local development setup
- **MONGODB_SETUP.md** - Database setup guide

---

## 🔒 Security Features

- ✅ **Password Hashing**: bcrypt for secure password storage
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **CORS Protection**: Controlled cross-origin access
- ✅ **Environment Variables**: Secrets not in code
- ✅ **.env Excluded**: Private config not on GitHub
- ✅ **MongoDB Atlas**: Cloud database with encryption

---

## 🤝 Contributing

This is a student project. For improvements:
1. Create a feature branch
2. Make changes
3. Test locally
4. Push to GitHub
5. Create pull request

---

## 📞 Support

For issues or questions:
1. Check ARCHITECTURE.md for design details
2. Check COMPLETE_DEPLOYMENT_GUIDE.md for deployment help
3. Check LOCAL_SETUP.md for local setup issues
4. Review API endpoints documentation above

---

## 📄 License

This project is for educational purposes.

---

## 🎉 Status

| Component | Status | Details |
|-----------|--------|---------|
| **Frontend** | ✅ Complete | HTML/CSS/JS ready, responsive design |
| **Backend** | ✅ Complete | Express API with JWT auth |
| **Database** | ✅ Complete | MongoDB Atlas configured |
| **Development** | ✅ Ready | Local setup working |
| **GitHub** | ✅ Pushed | All code on GitHub |
| **Render** | 🚀 Ready | Ready to deploy |
| **Netlify** | 🚀 Ready | Ready to deploy |

---

## 🚀 What's Next?

1. **Deploy Backend** → Render
2. **Get Render URL** → Copy it
3. **Update Frontend** → auth.js with Render URL
4. **Deploy Frontend** → Netlify
5. **Update CORS** → Render with Netlify URL
6. **Test Live App** → Signup/Login in production
7. **Celebrate** → 🎉 Your app is live!

---

**Created with ❤️ for Student Academic Management**

Version: 1.0.0 | Last Updated: April 4, 2026
