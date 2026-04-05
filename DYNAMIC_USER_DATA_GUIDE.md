# Dynamic User Data Implementation Guide

## ✅ Frontend Status: COMPLETE

Your frontend has been fully updated to display **real, dynamic user data** instead of static dummy data.

---

## 🎯 How It Works

### **When a User Logs In:**

1. **User credentials sent to backend**
   - Email/Registration number
   - Password
   - Backend validates and returns user ID + token

2. **Frontend loads all user data in parallel**
   ```javascript
   // Frontend calls these APIs automatically:
   - GET /api/user/:id/profile        → User personal data
   - GET /api/user/:id/attendance     → Attendance records
   - GET /api/user/:id/marks          → Grade/marks data
   - GET /api/user/:id/notifications  → User notifications
   - GET /api/user/:id/assignments    → Assignment submissions
   ```

3. **All pages display real user data**
   - Dashboard: User's actual attendance, CGPA, fees status
   - Profile: User's real name, email, phone, address
   - Attendance: Subject-wise attendance from database
   - Marks: Actual semester grades and SGPA
   - Assignments: User's submitted assignments
   - Notifications: Personalized notifications for user

---

## 📊 Updated Frontend Components

### **1. Script.js Changes**

#### **Enhanced `loadDashboardData()` Function**
```javascript
// Now fetches all user data in parallel:
const [profileRes, attendanceRes, marksRes, notificationsRes, assignmentsRes] = await Promise.all([
  getUserProfile(loggedInUser._id),
  getUserAttendance(loggedInUser._id),
  getUserMarks(loggedInUser._id),
  getUserNotifications(loggedInUser._id),
  getUserAssignments(loggedInUser._id)
]);

// Builds unified dashboard data:
dashboardData = {
  success: true,
  user: profileRes.success ? profileRes.user : loggedInUser,
  attendance: attendanceRes.success ? attendanceRes.data : [],
  marks: marksRes.success ? marksRes.data : {},
  notifications: notificationsRes.success ? notificationsRes.data : [],
  assignments: assignmentsRes.success ? assignmentsRes.data : []
};
```

#### **Updated Render Functions**

**renderAttendanceTable()** - Shows user's actual attendance
- Uses `dashboardData.attendance` from API
- Falls back to static demo data if API fails
- Handles division by zero safely
- Displays: Course code, name, faculty, conducted days, attended days, percentage

**renderMarksTable(sem)** - Shows user's actual grades
- Uses `dashboardData.marks[semester]` from API
- Supports both object and array format responses
- Falls back to static demo data
- Displays: Course code, name, credits, internal, external, total, grade, grade points

**renderAssignments()** - Shows user's submitted assignments
- Uses `dashboardData.assignments` from API
- Falls back to locally uploaded files
- Shows file type icons, status, dates
- Displays: Filename, subject, file size, upload date

**renderNotifications(filter)** - Shows user's notifications
- Uses `dashboardData.notifications` from API
- Falls back to generic demo notifications
- Supports filtering by type (exam, event, admin, all)
- Displays: Icon, title, message, time, unread status

### **2. API Client (auth.js) - Complete Endpoints**

All endpoints ready to call:

```javascript
// User endpoints
- getUserProfile(userId)          // GET /api/user/:id/profile
- updateUserProfile(userId, data) // PUT /api/user/:id/profile

// Academic data endpoints
- getUserAttendance(userId)       // GET /api/user/:id/attendance
- getUserMarks(userId)            // GET /api/user/:id/marks
- getUserDashboardData(userId)    // GET /api/user/:id/dashboard

// Notifications endpoints
- getUserNotifications(userId)    // GET /api/user/:id/notifications
- markNotificationAsRead(notifId) // PUT /api/notification/:id/read

// Assignments endpoints
- getUserAssignments(userId)      // GET /api/user/:id/assignments
```

---

## 🔧 Backend API Endpoints Needed

Your backend must implement these endpoints to make user data dynamic:

### **1. User Profile Endpoint**
```
GET /api/user/:id/profile

Response:
{
  "success": true,
  "user": {
    "_id": "userId",
    "name": "Arjun Sharma",
    "email": "arjun@vit.ac.in",
    "registrationNo": "21BCE1234",
    "department": "CSE",
    "branch": "AI & ML",
    "dateOfBirth": "2002-03-15",
    "gender": "Male",
    "bloodGroup": "B+",
    "phone": "+91-9876543210",
    "address": "Green Park, Delhi",
    "city": "Delhi",
    "state": "Delhi",
    "country": "India",
    "cgpa": 8.76,
    "feeStatus": "Paid",
    "hostelBlock": "A-304",
    "createdAt": "2021-08-15T10:00:00Z"
  }
}
```

### **2. Attendance Endpoint**
```
GET /api/user/:id/attendance

Response:
{
  "success": true,
  "data": [
    {
      "code": "CSE3001",
      "courseCode": "CSE3001",
      "name": "Data Structures",
      "courseName": "Data Structures",
      "faculty": "Dr. Arun Kumar",
      "conducted": 52,
      "attended": 45,
      "semester": 6
    },
    {
      "code": "CSE3002",
      "name": "Database Management",
      "faculty": "Dr. Priya Nair",
      "conducted": 48,
      "attended": 42,
      "semester": 6
    }
    // ... more subjects
  ]
}
```

### **3. Marks Endpoint**
```
GET /api/user/:id/marks

Response Option 1 (Object format):
{
  "success": true,
  "data": {
    "6": {
      "semester": 6,
      "sgpa": 8.85,
      "credits": 22,
      "subjects": [
        {
          "code": "CSE4001",
          "name": "Data Structures",
          "credits": 4,
          "internal": 38,
          "external": 55,
          "total": 93,
          "grade": "S",
          "gp": 10
        }
        // ... more courses
      ]
    },
    "5": { ... },
    "4": { ... }
  }
}

Response Option 2 (Array format):
{
  "success": true,
  "data": [
    {
      "semester": 6,
      "sgpa": 8.85,
      "credits": 22,
      "subjects": [
        {
          "code": "CSE4001",
          "name": "Data Structures",
          "credits": 4,
          "internal": 38,
          "external": 55,
          "total": 93,
          "grade": "S",
          "gp": 10
        }
      ]
    }
  ]
}
```

### **4. Notifications Endpoint**
```
GET /api/user/:id/notifications

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "_id": "notifId",
      "type": "exam",
      "icon": "fa-file-alt",
      "color": "notif-red",
      "title": "Internal Assessment 2 Schedule Released",
      "body": "IA2 for all Semester 6 courses will be held from April 12–14, 2026.",
      "message": "IA2 for all Semester 6 courses...",
      "time": "2h ago",
      "createdAt": "2026-04-05T10:30:00Z",
      "unread": true,
      "link": "/page/marks"
    },
    {
      "id": 2,
      "type": "event",
      "icon": "fa-music",
      "color": "notif-blue",
      "title": "VIT Vibrance 2026 — Registration Open",
      "body": "Annual cultural fest registrations are now live.",
      "unread": true
    }
    // ... more notifications
  ]
}
```

### **5. Assignments Endpoint**
```
GET /api/user/:id/assignments

Response:
{
  "success": true,
  "data": [
    {
      "id": "assignmentId",
      "name": "Lab Report 6 — Data Structures",
      "fileName": "Lab_Report_6_DS.pdf",
      "subject": "CSE4001 · Data Structures",
      "courseCode": "CSE4001",
      "size": "1.2 MB",
      "bytes": 1258291,
      "date": "Apr 2, 2026",
      "uploadedAt": "2026-04-02T14:30:00Z",
      "type": "pdf",
      "status": "Submitted",
      "submittedAt": "2026-04-05T09:15:00Z",
      "marks": null,
      "feedback": null
    },
    {
      "name": "ML_Project_Phase1",
      "subject": "CSE4002 · Artificial Intelligence",
      "size": "8.4 MB",
      "date": "Mar 28, 2026",
      "type": "zip",
      "status": "Submitted"
    }
    // ... more assignments
  ]
}
```

---

## 🧪 Testing the Dynamic Data

### **Step 1: Test Login**
1. Go to `http://localhost:5500`
2. Sign up or login with credentials
3. Check browser console (F12 → Console)
4. You should see:
   ```
   Dashboard data loaded: {
     success: true,
     user: {...},
     attendance: [...],
     marks: {...},
     notifications: [...],
     assignments: [...]
   }
   ```

### **Step 2: Check Dashboard Data**
1. After login, go to Dashboard
2. Attendance, CGPA, Fees should show user's real data
3. Charts should populate with actual attendance percentages

### **Step 3: Test Each Page**
- **Attendance Page**: Should show user's subject-wise attendance
- **Marks Page**: Should show user's semester grades and SGPA
- **Assignments Page**: Should show user's submitted files
- **Notifications Page**: Should show personalized notifications
- **Profile Page**: Should show user's actual info

### **Step 4: Check If API Fails**
If backend doesn't respond or endpoints aren't implemented:
- Frontend will gracefully use static demo data
- No errors in console
- User can still interact with the app
- Once backend API is ready, real data will auto-load

---

## 🔄 Data Flow Diagram

```
User Login
    ↓
Backend validates → Returns user._id + token
    ↓
Frontend stores user in localStorage
    ↓
Page load → loadDashboardData() called
    ↓
Parallel API calls:
├─ GET /api/user/:id/profile
├─ GET /api/user/:id/attendance
├─ GET /api/user/:id/marks
├─ GET /api/user/:id/notifications
└─ GET /api/user/:id/assignments
    ↓
All data compiled into dashboardData object
    ↓
All render functions use dashboardData
    ↓
Pages display real user data
    ↓
User sees: Their attendance, grades, assignments, notifications
```

---

## 💡 Key Features

### **1. Graceful Fallback**
- If API returns error → Use static demo data
- If API returns empty → Still show empty state (not demo data)
- If API fails → Log error, continue working

### **2. Data Validation**
- Handles missing fields (uses "—")
- Safely divides by zero in calculations
- Default values for optional fields

### **3. Flexible Response Format**
- Marks can be object (keyed by semester) or array
- Supports multiple field names (name/courseName, etc.)
- Works with different API response structures

### **4. Real-time Updates**
- Data loads on page refresh
- User info cached in localStorage
- API called fresh each pageload

---

## 📝 Example Implementation

### **Backend Route (Express.js)**
```javascript
// Get user attendance
router.get('/user/:id/attendance', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    
    // Fetch from Attendance collection where userId matches
    const attendance = await Attendance.find({ userId });
    
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Get user marks
router.get('/user/:id/marks', async (req, res) => {
  try {
    const userId = req.params.id;
    const marks = await Marks.find({ userId });
    
    // Group by semester
    const marksGrouped = {};
    marks.forEach(m => {
      if (!marksGrouped[m.semester]) {
        marksGrouped[m.semester] = {
          semester: m.semester,
          sgpa: m.sgpa,
          credits: m.credits,
          subjects: m.courses || []
        };
      }
    });
    
    res.json({ success: true, data: marksGrouped });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
```

---

## ✨ What's Ready

✅ Frontend fully updated  
✅ API endpoints defined in auth.js  
✅ Render functions use real data  
✅ Fallback to demo data working  
✅ All pages ready for dynamic content  
✅ Data validation in place  
⏳ Backend API endpoints (next step)

---

## 🚀 Next Steps

1. **Update Backend Routes** to return user-specific data
2. **Implement API endpoints** for attendance, marks, notifications, assignments
3. **Query Database** to fetch real data for logged-in user
4. **Test on localhost** with real data from API
5. **Deploy** both frontend and backend to production

---

## 📞 Quick Reference

**When all APIs are ready**, simply login and the app will automatically:
- Fetch user's real profile
- Load their attendance records
- Show their grades and SGPA
- Display personalized notifications
- List their submitted assignments

**All without changing any frontend code!** The frontend is already complete.
