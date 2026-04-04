# Frontend Troubleshooting Guide

## ✅ Current Status

**Frontend Server**: ✅ Running on `http://localhost:5500`  
**Backend Server**: ✅ Running on `http://localhost:5000`  
**MongoDB Connection**: ✅ Connected to Atlas

---

## 🔧 How to Access the Application

### **1. Open in Browser**
```
http://localhost:5500
```

### **2. What You Should See**
- **Loading Spinner** (2 seconds) with "AcadPortal" logo
- **Login Page** (if not logged in) with:
  - Registration / Email field
  - Password field
  - Login & Sign Up tabs
  - Forgot Password option

### **3. Test Account**
Use these credentials to test:
```
Email/Registration: student@vit.ac.in
Password: password123
```

---

## 🐛 Common Frontend Issues & Fixes

### **Issue 1: Page Shows Blank/White Screen**

**Causes:**
- Browser cache issues
- JavaScript not loading
- Missing CSS files

**Solutions:**

**Step 1: Hard Refresh Browser**
```
Windows/Linux: Ctrl + Shift + R
macOS: Cmd + Shift + R
```

**Step 2: Check Developer Console**
1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Look for red error messages
4. Share the error message

**Step 3: Check Network Tab**
1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Refresh page (F5)
4. Check if files are loading:
   - ✅ `index.html` - Status 200
   - ✅ `style.css` - Status 200
   - ✅ `script.js` - Status 200
   - ✅ Font files - Status 200

---

### **Issue 2: Login Not Working**

**Test Path:**

**Step 1: Verify Backend is Responding**
1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Paste this code:
```javascript
fetch('http://localhost:5000/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    emailOrReg: 'student@vit.ac.in',
    password: 'password123'
  })
}).then(r => r.json()).then(d => console.log(d))
```
4. Press Enter
5. Check console for response

**Expected Output:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { ... }
}
```

**If Error:** Check backend is running with `npm start` in `backend/` folder

---

**Step 2: Check Form Validation**
1. Open **Console** tab (F12)
2. Try logging in with:
   - Email: `student@vit.ac.in`
   - Password: `password123`
3. Check console for validation errors

**Expected Messages:**
- ✅ "Login successful" - Successful login
- ❌ "Invalid credentials" - Wrong email/password
- ❌ "Network error" - Backend not responding

---

### **Issue 3: Avatar/Profile Images Not Showing**

**Cause:** DiceBear API might be slow or blocked

**Visible:** Gray boxes instead of user avatars

**Fix:**
1. Wait 2-3 seconds for images to load
2. If still not showing, try reloading page
3. Check Network tab in Developer Tools for `dicebear.com` requests

---

### **Issue 4: Charts Not Displaying**

**Cause:** Chart.js library might not be loaded

**Check:**
1. Open **Console** tab (F12)
2. Look for `Chart is not defined` error
3. Check **Network** tab for `chart.js` CDN

**Internet Status:**
- ✅ Connected to internet (CDN required for Chart.js)
- ❌ Offline - Charts won't load (use demo data instead)

---

### **Issue 5: Dark Mode Not Working**

**Solutions:**

**Step 1: Check localStorage**
1. Open Developer Tools (F12)
2. Go to **Application** → **Local Storage**
3. Look for `theme` key
4. Should show `"dark"` or `"light"`

**Step 2: Manual Toggle**
1. Click theme toggle button (moon icon) in settings
2. Should switch between light/dark mode
3. Refresh page - should remember setting

**Step 3: Clear localStorage & Reset**
1. In Console (F12), run:
```javascript
localStorage.clear()
```
2. Refresh page
3. Try toggling theme again

---

### **Issue 6: Sidebar Not Opening/Closing**

**Solutions:**

**Step 1: Check Classes**
1. Open **Elements** tab in DevTools (F12)
2. Click the menu toggle button
3. Inspect the sidebar element
4. Should toggle `.open` class

**Step 2: Manual Test in Console**
```javascript
// Open sidebar
document.querySelector('.sidebar').classList.add('open');

// Close sidebar
document.querySelector('.sidebar').classList.remove('open');
```

---

### **Issue 7: Notifications Not Loading**

**Check:**
1. Sidebar menu should show "Notifications"
2. Click to navigate to notifications page
3. If page blank, check **Console** (F12) for errors

**Default Data:**
- App has fallback notification data
- Should display even if backend request fails

---

### **Issue 8: API Calls Failing**

**Debugging Steps:**

**Step 1: Check Backend Connection**
```javascript
// In console (F12):
fetch('http://localhost:5000/api')
  .then(r => r.status)
  .then(s => console.log('Backend is: ' + (s ? 'responding' : 'down')))
```

**Expected:** Status 200-404 (means backend is up)

**Step 2: Check CORS Issues**
If you see error like:
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Open `backend/.env`
2. Verify: `CORS_ORIGIN=http://localhost:5500`
3. Restart backend with `npm start`

**Step 3: Check Token/Session**
```javascript
// In console:
localStorage.getItem('user')
```

Should show user data after login.

---

## 🧪 Testing Checklist

Run through these tests:

### **Frontend Loading**
- [ ] Page loads at `http://localhost:5500`
- [ ] Loading spinner appears for 2 seconds
- [ ] Auth page shows after spinner
- [ ] No console errors (F12 → Console)

### **Authentication**
- [ ] Can see Login & Sign Up forms
- [ ] Form fields accept input
- [ ] Submit button is clickable
- [ ] Error messages appear for invalid input

### **Login Functionality**
- [ ] Can login with `student@vit.ac.in` / `password123`
- [ ] Success message appears
- [ ] Redirects to dashboard
- [ ] User name and reg number display

### **Dashboard Features**
- [ ] Dashboard page loads with content
- [ ] Sidebar navigation works (click menu items)
- [ ] Can navigate to different pages
- [ ] User info displays in navbar

### **Theme Toggle**
- [ ] Dark mode toggle works
- [ ] Colors change when toggled
- [ ] Setting persists after refresh

### **Responsive Design**
- [ ] Works on full screen (desktop)
- [ ] Sidebar collapses on narrow screens
- [ ] Mobile layout is readable

---

## 🔍 Detailed Debugging: Using Browser DevTools

### **Console Tab (F12)**
Shows JavaScript errors and logs.

**What to look for:**
- Red error messages ❌
- Warning messages 🟡
- `import` statement issues
- Undefined functions
- Network failures

**Common Errors:**

1. **`Uncaught TypeError: function is not defined`**
   - Missing or misnamed function
   - Check spelling in script.js

2. **`Cannot read property 'X' of null`**
   - Element not found in HTML
   - Check element IDs match in HTML & JS

3. **`Cross-Origin Request Blocked`**
   - Backend CORS not configured
   - Verify `.env` has correct CORS_ORIGIN

4. **`Failed to fetch`**
   - Backend not running
   - Wrong API URL
   - Network connectivity issue

---

### **Network Tab (F12)**
Shows all HTTP requests.

**Check:**
1. All `.js`, `.css`, `.html` files load (Status 200)
2. Font files load from googleapis.com
3. Chart.js loads from CDN
4. API calls to `localhost:5000` show responses

**Status Codes:**
- 200 ✅ Success
- 304 ✅ Cached (OK)
- 404 ❌ File not found
- 500 ❌ Server error
- CORS error ❌ Backend CORS issue

---

### **Application Tab (F12)**
Shows stored data.

**Check localStorage:**
1. Go to **Local Storage**
2. Click `http://localhost:5500`
3. Should see `theme` and `user` keys after login
4. Click `Clear All` to reset if needed

---

### **Elements Tab (F12)**
Shows HTML structure.

**Use:**
1. Right-click on page → **Inspect**
2. Find element in HTML tree
3. Check if it has the expected content
4. Verify CSS classes are applied

---

## 🚀 Quick Restart Commands

If something is broken, try these:

### **Option 1: Restart Everything**
```powershell
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
python -m http.server 5500
```

Then visit: `http://localhost:5500`

### **Option 2: Hard Reset**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Close all tabs with port 5500
3. Restart servers
4. Hard refresh (Ctrl+Shift+R)

### **Option 3: Check if Ports are Free**
```powershell
# Check port 5000
netstat -ano | findstr :5000

# Check port 5500
netstat -ano | findstr :5500
```

If ports are in use by other processes, either:
- Stop the other process
- Change to different port (update `.env` for backend)

---

## 📞 Getting Help

When reporting an issue, include:

1. **What you did**
   - "Tried to login with student@vit.ac.in"

2. **What happened**
   - "Page went blank"
   - "Got error message 'X'"

3. **Console error** (F12 → Console)
   - Copy exact error message

4. **Network tab info** (F12 → Network)
   - Which requests failed?
   - What status codes?

5. **Backend status**
   - Is `npm start` running in `backend/` folder?
   - Does it show "MongoDB Connected"?

---

## ✨ You're All Set!

Your **AcadPortal** is ready to use!

- **Frontend**: `http://localhost:5500`
- **Backend API**: `http://localhost:5000/api`
- **Database**: MongoDB Atlas (Cloud)

**Next Step**: Prepare for production deployment to Render + Netlify!
