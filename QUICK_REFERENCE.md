# Quick Reference Guide - AcadPortal Updates

## 🚀 Quick Start

### 1. Run Backend
```bash
cd backend
npm install
node server.js
```

### 2. Open Frontend
```bash
cd frontend
# Open index.html in browser
# Or serve with: npx http-server
```

### 3. Test
- Open browser, you'll see login page
- Click "Create one" to sign up
- Enter any credentials (for demo)
- You should see the dashboard

---

## 📂 Key Files Modified

| File | Changes |
|------|---------|
| `backend/models/User.js` | ✅ Extended with 20+ new fields |
| `backend/models/Attendance.js` | ✨ NEW - Track attendance |
| `backend/models/Marks.js` | ✨ NEW - Store grades |
| `backend/models/Notification.js` | ✨ NEW - Notifications |
| `backend/models/Assignment.js` | ✨ NEW - Assignments |
| `backend/controllers/authController.js` | ✅ Added 10 new endpoints |
| `backend/routes/authRoutes.js` | ✅ Connected new routes |
| `frontend/api/auth.js` | ✅ Added all API functions + error handling |
| `frontend/script.js` | ✅ Complete rewrite - Dynamic & interactive |
| `frontend/style.css` | ✅ Added 400+ lines responsive CSS |
| `frontend/index.html` | ✓ No changes needed |

---

## 🔌 API Endpoints

```
POST   /api/login                      Login
POST   /api/signup                     Sign Up
GET    /api/user/:id/profile           Get Profile
PUT    /api/user/:id/profile           Update Profile
GET    /api/user/:id/dashboard         Dashboard Data
GET    /api/user/:id/attendance        Attendance
GET    /api/user/:id/marks             Marks
GET    /api/user/:id/notifications     Notifications
GET    /api/user/:id/assignments       Assignments
PUT    /api/notification/:id/read      Mark Read
```

---

## 💾 localStorage Structure

```javascript
localStorage.getItem("user")
// Returns:
{
  _id: "...mongodb_id...",
  name: "Student Name",
  regNo: "21BCE1234",
  email: "student@vit.ac.in",
  semester: 6,
  branch: "CSE",
  cgpa: 8.76,
  attendancePercentage: 87,
  feeStatus: "Paid",
  phone: "+91...",
  dateOfBirth: "...",
  // ... more fields
}
```

---

## 🎨 Responsive Breakpoints

```css
1400px+  → Desktop (4-column grid)
1100px   → Tablet large (2-column grid)
768px    → Tablet (mobile menu, 2-column)
600px    → Mobile (1-column)
400px    → Small mobile (compact)
```

---

## 🔑 Important Functions

### In `script.js`:

```javascript
// Load user data from localStorage
loadDashboardData()         // Fetch from API or use localStorage

// Update UI with user data
updateNavbarUserInfo()      // Update navbar name/avatar
updateSidebarUserInfo()     // Update sidebar name/avatar  
initializeDashboard()       // Update greeting, stats, etc.

// Navigation
navigateTo(page)            // Go to page (dashboard, profile, etc.)

// Authentication
handleLogin(event)          // Process login
handleSignup(event)         // Process signup
handleLogout()              // Clear localStorage, go to auth

// Dark mode
toggleDark()                // Switch light/dark theme

// Mobile
toggleSidebar()             // Open/close mobile sidebar

// Charts
initDashboardCharts()       // Initialize Chart.js charts

// Render functions
renderAttendanceTable()     // Dynamic attendance table
renderMarksTable(sem)       // Dynamic marks display
renderAssignments()         // Dynamic assignments list
renderNotifications(filter) // Dynamic notifications
```

### In `api/auth.js`:

```javascript
// Auth
loginUser(data)             // POST /login
signupUser(data)            // POST /signup

// Profile
getUserProfile(userId)      // GET /user/:id/profile
updateUserProfile(userId, data) // PUT /user/:id/profile

// Data
getUserDashboardData(userId)// GET /user/:id/dashboard
getUserAttendance(userId)   // GET /user/:id/attendance
getUserMarks(userId)        // GET /user/:id/marks
getUserNotifications(userId)// GET /user/:id/notifications
getUserAssignments(userId)  // GET /user/:id/assignments

// Notifications
markNotificationAsRead(id)  // PUT /notification/:id/read
```

---

## 🔄 Common Tasks

### Change Greeting Message
```javascript
// In initializeDashboard()
const greeting = "Welcome Back";
greetingEl.textContent = `${greeting}, ${loggedInUser.name}!`;
```

### Add New Student Field
1. Add to User model: `backend/models/User.js`
   ```javascript
   newField: { type: String, default: null }
   ```

2. Update HTML to display it
   ```html
   <span id="new-field"></span>
   ```

3. Update script.js to set it
   ```javascript
   document.getElementById("new-field").textContent = loggedInUser.newField;
   ```

### Change Color Scheme
```css
/* In style.css :root */
--primary: #2563eb;         /* Change this */
--accent: #0ea5e9;          /* And this */
```

### Add New Page/Section
1. Add HTML section in `index.html`
   ```html
   <section class="page" id="page-newpage">
   ```

2. Add sidebar link
   ```html
   <a class="sidebar-link" data-page="newpage" onclick="navigateTo('newpage')">
   ```

3. Add rendering function in `script.js`

---

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Cannot read property 'name' of null" | User not logged in | Check localStorage, login first |
| Charts not rendering | Chart.js CDN issue | Check network tab for Chart.js load |
| Sidebar not toggling | Mobile menu code not working | Check `toggleSidebar()` function |
| API returns 404 | Wrong endpoint URL | Check `BASE_URL` in `api/auth.js` |
| "CORS error" | Frontend & backend different domains | Add CORS middleware to backend |
| Data not persisting | localStorage not working | Check browser storage limits |

---

## 📱 Mobile Testing Checklist

- [ ] Open on actual phone
- [ ] Sidebar hamburger works
- [ ] Sidebar closes when tapping background
- [ ] Text is readable without zoom
- [ ] Forms are touch-friendly
- [ ] No horizontal scrolling
- [ ] Dark mode works
- [ ] All pages load correctly
- [ ] Buttons clickable without toggling other elements
- [ ] Table doesn't overflow (or scrolls horizontally)

---

## 🎯 Development Tips

1. **Use Browser DevTools**
   - F12 → Elements tab: Check HTML structure
   - F12 → Console tab: See errors
   - F12 → Network tab: Monitor API calls
   - F12 → Application tab: View localStorage

2. **Test API Calls**
   ```javascript
   // In console:
   const user = JSON.parse(localStorage.getItem("user"));
   getUserDashboardData(user._id).then(console.log);
   ```

3. **Inspect Responsive Design**
   ```
   F12 → Click device icon → Choose device
   Or manually set width: 768px,600px, 400px
   ```

4. **Debug Async Issues**
   ```javascript
   // Add console logs
   console.log("Loading user...");
   const res = await getUserProfile(userId);
   console.log("Loaded:", res);
   ```

5. **Monitor localStorage**
   ```javascript
   // In console:
   localStorage.getItem("user")
   JSON.parse(localStorage.getItem("user"))
   localStorage.removeItem("user")
   localStorage.clear()
   ```

---

## 📊 Data Seeding (Backend)

To populate test data in MongoDB:

```javascript
// In backend/server.js or separate seed.js file
const User = require("./models/User");
const Attendance = require("./models/Attendance");

// Create test user
const user = await User.create({
  name: "Arjun Sharma",
  regNo: "21BCE1234",
  email: "arjun@vit.ac.in",
  password: "password123",
  semester: 6,
  cgpa: 8.76,
  attendancePercentage: 87
});

// Create attendance records
await Attendance.create({
  userId: user._id,
  courseCode: "CSE3001",
  courseName: "Data Structures",
  conducted: 52,
  attended: 48
});
```

---

## 🚀 Production Deployment

### Before Deploying:

1. **Environment Variables** (.env file)
   ```
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/acadportal
   PORT=5000
   CORS_ORIGIN=https://yourfrontend.com
   NODE_ENV=production
   ```

2. **Security Updates**
   ```javascript
   // Use JWT instead of storing ID in localStorage
   // Hash passwords with bcrypt
   // Add input validation
   // Enable HTTPS
   ```

3. **Database**
   ```
   Use MongoDB Atlas (cloud)
   or self-hosted MongoDB
   ```

4. **Hosting Options**
   - Backend: Heroku, Railway, Render, AWS
   - Frontend: Vercel, Netlify, GitHub Pages

---

## 📞 Support Resources

- **Errors not showing?** → Check `window.onerror` at top of script.js
- **API not connecting?** → Check Network tab (F12)
- **localStorage not working?** → Check if in private/incognito mode
- **Mobile viewport issues?** → Check meta viewport tag in HTML

---

**Last Updated**: April 4, 2026
**Version**: 2.0
