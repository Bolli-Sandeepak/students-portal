/* ═══════════════════════════════════════
   AcadPortal — Main Script (Updated)
   Dynamic & Responsive Version
═══════════════════════════════════════ */

"use strict";
import { loginUser, signupUser, getUserProfile, getUserDashboardData, getUserAttendance, getUserMarks, getUserNotifications, getUserAssignments, markNotificationAsRead } from "./api/auth.js";

/* ──────────────────── DATA ──────────────────── */

// Static fallback data (for demo purposes)
const NOTIFICATIONS_DATA = [
  { id:1, type:"exam", icon:"fa-file-alt", color:"notif-red", title:"Internal Assessment 2 Schedule Released", body:"IA2 for all Semester 6 courses will be held from April 12–14, 2026. Kindly check the timetable on the portal.", time:"2h ago", unread:true },
  { id:2, type:"event", icon:"fa-music", color:"notif-blue", title:"VIT Vibrance 2026 — Registration Open", body:"Annual cultural fest registrations are now live. Last date: April 18. Register via Student Activities portal.", time:"1 day ago", unread:true },
  { id:3, type:"admin", icon:"fa-rupee-sign", color:"notif-amber", title:"Semester 7 Fee Payment Reminder", body:"Semester 7 fees are due on July 30, 2026. Early payment avoids late charges. Visit Fee Payment section.", time:"2 days ago", unread:true },
];

const DUMMY_ASSIGNMENTS = [
  { name:"Lab Report 6 — Data Structures.pdf", subject:"CSE4001 · Data Structures", size:"1.2 MB", date:"Apr 2, 2026", type:"pdf", status:"Submitted" },
  { name:"ML_Project_Phase1.zip", subject:"CSE4002 · Artificial Intelligence", size:"8.4 MB", date:"Mar 28, 2026", type:"zip", status:"Submitted" },
];

/* ──────────────────── STATE ──────────────────── */
let isDark = false;
let sidebarOpen = true;
let currentPage = "dashboard";
let currentSem = 1;
let currentNotifFilter = "all";
let assignments = [...DUMMY_ASSIGNMENTS];

// User data from localStorage
let loggedInUser = null;
let dashboardData = null;

/* ──────────────────── INITIALIZE APP ──────────────────── */

window.addEventListener("load", () => {
  createParticles();
  
  // Check if user is logged in
  const storedUser = localStorage.getItem("user");
  
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.transform = "scale(1.04)";
      
      setTimeout(() => {
        loader.classList.add("hidden");
        
        if (storedUser) {
          loggedInUser = JSON.parse(storedUser);
          loadDashboardData();
          showApp();
        } else {
          showAuth();
        }
      }, 500);
    } else {
      if (storedUser) {
        loggedInUser = JSON.parse(storedUser);
        loadDashboardData();
        showApp();
      } else {
        showAuth();
      }
    }
  }, 2000);
});

// Load dashboard data from API
async function loadDashboardData() {
  try {
    if (!loggedInUser || !loggedInUser._id) {
      console.error("User ID not found");
      return;
    }
    
    const res = await getUserDashboardData(loggedInUser._id);
    if (res.success) {
      dashboardData = res;
      loggedInUser = res.user; // Update user data
      localStorage.setItem("user", JSON.stringify(res.user)); // Save updated user data
      initializeAppUI();
    } else {
      console.warn("Failed to load dashboard data, using local data");
      initializeAppUI();
    }
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    initializeAppUI();
  }
}

// Initialize App UI with user data
function initializeAppUI() {
  if (!loggedInUser) return;
  
  // Update navbar with user info
  updateNavbarUserInfo();
  
  // Update sidebar with user info
  updateSidebarUserInfo();
  
  // Initialize dashboard
  initializeDashboard();
  
  if (dashboardData && dashboardData.assignments) {
    assignments = dashboardData.assignments;
  }
  
  // Render static content
  renderAttendanceTable();
  switchSem(loggedInUser.semester || 1);
  renderAssignments();
  renderNotifications();
  initDashboardCharts();
  setTodayDate();
  
  // Setup event listeners
  setupEventListeners();
}

// Update navbar with user info
function updateNavbarUserInfo() {
  if (!loggedInUser) return;
  
  const navName = document.querySelector(".nav-name");
  const navReg = document.querySelector(".nav-reg");
  const navAvatar = document.querySelector(".nav-avatar");
  
  if (navName) navName.textContent = loggedInUser.name || "Student";
  if (navReg) navReg.textContent = loggedInUser.regNo || "Reg No";
  if (navAvatar) {
    // Use user name as seed for avatar
    const seed = loggedInUser.name ? loggedInUser.name.replace(/\s+/g, '') : "Student";
    navAvatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`;
  }
}

// Update sidebar with user info
function updateSidebarUserInfo() {
  if (!loggedInUser) return;
  
  const sidebarName = document.querySelector(".sidebar-profile-info strong");
  const sidebarReg = document.querySelector(".sidebar-profile-info span");
  const sidebarAvatar = document.querySelector(".sidebar-avatar");
  
  if (sidebarName) sidebarName.textContent = loggedInUser.name || "Student";
  if (sidebarReg) sidebarReg.textContent = `${loggedInUser.regNo || "Reg No"} · ${loggedInUser.branch || "CSE"}`;
  if (sidebarAvatar) {
    const seed = loggedInUser.name ? loggedInUser.name.replace(/\s+/g, '') : "Student";
    sidebarAvatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`;
  }
}

// Initialize dashboard with user data
function initializeDashboard() {
  if (!loggedInUser) return;
  
  // Update greeting message
  const greetingEl = document.querySelector(".page-header h2");
  if (greetingEl) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
    greetingEl.textContent = `${greeting}, ${loggedInUser.name || "Student"}! 👋`;
  }
  
  // Update semester chip
  const semesterChip = document.querySelector(".semester-chip");
  if (semesterChip) {
    semesterChip.textContent = `Semester ${loggedInUser.semester || 1}`;
  }
  
  // Update overview cards with user data
  if (dashboardData) {
    updateOverviewCards();
  } else {
    // Use user data from localStorage
    updateOverviewCardsFromUser();
  }
}

function updateOverviewCards() {
  // Update with dashboardData
  const attendanceCard = document.querySelector(".ov-card--blue .ov-value");
  const cgpaCard = document.querySelector(".ov-card--indigo .ov-value");
  const feesCard = document.querySelector(".ov-card--green .ov-value");
  
  if (attendanceCard && dashboardData.attendance) {
    const avgAtt = dashboardData.attendance.reduce((a, b) => a + b.percentage, 0) / dashboardData.attendance.length || 0;
    attendanceCard.textContent = avgAtt.toFixed(1) + "%";
  }
  
  if (cgpaCard && dashboardData.user) {
    cgpaCard.textContent = (dashboardData.user.cgpa || 8.76).toFixed(2);
  }
  
  if (feesCard && dashboardData.user) {
    feesCard.textContent = dashboardData.user.feeStatus || "Paid";
  }
}

function updateOverviewCardsFromUser() {
  const attendanceCard = document.querySelector(".ov-card--blue .ov-value");
  const cgpaCard = document.querySelector(".ov-card--indigo .ov-value");
  const feesCard = document.querySelector(".ov-card--green .ov-value");
  
  if (attendanceCard) attendanceCard.textContent = (loggedInUser.attendancePercentage || 85) + "%";
  if (cgpaCard) cgpaCard.textContent = (loggedInUser.cgpa || 0).toFixed(2);
  if (feesCard) feesCard.textContent = loggedInUser.feeStatus || "Paid";
}

function setupEventListeners() {
  // Profile page
  const profilePageName = document.querySelector("#page-profile h2");
  const profilePageReg = document.querySelector("#page-profile .profile-reg-badge");
  const profilePageInfo = document.querySelectorAll("#page-profile .info-field span");
  
  if (profilePageName) profilePageName.textContent = loggedInUser.name || "Student";
  if (profilePageReg) profilePageReg.textContent = loggedInUser.regNo || "Reg No";
  
  // Update profile info fields
  if (profilePageInfo.length > 0) {
    profilePageInfo[0].textContent = loggedInUser.name || "—";
    profilePageInfo[1].textContent = loggedInUser.dateOfBirth || "—";
    profilePageInfo[2].textContent = loggedInUser.gender || "—";
    profilePageInfo[3].textContent = loggedInUser.bloodGroup || "—";
    profilePageInfo[4].textContent = loggedInUser.phone || "—";
    profilePageInfo[5].textContent = loggedInUser.email || "—";
    profilePageInfo[6].textContent = loggedInUser.address || "—";
    profilePageInfo[7].textContent = loggedInUser.state || "—";
  }
  
  // Update academic info
  const academicInfo = document.querySelectorAll("#page-profile .info-card:nth-of-type(2) .info-field span");
  if (academicInfo.length > 0) {
    academicInfo[0].textContent = loggedInUser.regNo || "—";
    academicInfo[1].textContent = "B.Tech";
    academicInfo[2].textContent = loggedInUser.branch || "—";
    academicInfo[3].textContent = "Artificial Intelligence & ML";
    academicInfo[4].textContent = "SCOPE — VIT-AP";
    academicInfo[5].textContent = "Dr. Priya Nair";
    academicInfo[6].textContent = "2021";
    academicInfo[7].textContent = "May 2025";
  }
}

/* ──────────────────── AUTH HANDLERS ──────────────────── */

function switchAuth(type) {
  document.querySelectorAll(".auth-card").forEach(card => card.classList.add("hidden"));
  const target = document.getElementById(`${type}-card`);
  if (target) target.classList.remove("hidden");
}

function showAuth() {
  const authPage = document.getElementById("auth-page");
  const appDiv = document.getElementById("app");
  if (authPage) authPage.classList.remove("hidden");
  if (appDiv) appDiv.classList.add("hidden");
}

function showApp() {
  const authPage = document.getElementById("auth-page");
  const appDiv = document.getElementById("app");
  if (authPage) authPage.classList.add("hidden");
  if (appDiv) appDiv.classList.remove("hidden");
}

function showForgot() {
  switchAuth("forgot");
}

function togglePass(id, btn) {
  const el = document.getElementById(id);
  const isPass = el.type === "password";
  el.type = isPass ? "text" : "password";
  btn.innerHTML = `<i class="fas fa-eye${isPass ? "-slash" : ""}"></i>`;
}

async function handleLogin(e) {
  e.preventDefault();
  
  const id = document.getElementById("login-id").value.trim();
  const pass = document.getElementById("login-pass").value;
  
  clearErrors(["login-id-error", "login-pass-error"]);
  
  if (!id || !pass) {
    showToast("Enter credentials", "error");
    return;
  }
  
  try {
    const res = await loginUser({
      emailOrReg: id,
      password: pass
    });
    
    if (res.success) {
      loggedInUser = res.user;
      localStorage.setItem("user", JSON.stringify(res.user));
      showToast("Login successful 👋", "success");
      
      setTimeout(() => {
        loadDashboardData();
        showApp();
      }, 600);
    } else {
      showToast(res.message || "Login failed", "error");
    }
  } catch (err) {
    showToast("Network error: " + err.message, "error");
    console.error(err);
  }
}

async function handleSignup(e) {
  e.preventDefault();
  
  clearErrors(["su-name-error","su-reg-error","su-email-error","su-pass-error","su-cpass-error"]);
  
  const name = document.getElementById("su-name").value.trim();
  const reg = document.getElementById("su-reg").value.trim();
  const email = document.getElementById("su-email").value.trim();
  const pass = document.getElementById("su-pass").value;
  const cpass = document.getElementById("su-cpass").value;
  
  if (pass !== cpass) {
    showToast("Passwords do not match", "error");
    return;
  }
  
  if (pass.length < 8) {
    showToast("Password must be at least 8 characters", "error");
    return;
  }
  
  try {
    const res = await signupUser({
      name,
      regNo: reg,
      email,
      password: pass
    });
    
    if (res.success) {
      showToast("Signup successful 🎉", "success");
      setTimeout(() => switchAuth("login"), 600);
    } else {
      showToast(res.message || "Signup failed", "error");
    }
  } catch (err) {
    showToast("Network error: " + err.message, "error");
  }
}

function handleForgot(e) {
  e.preventDefault();
  showToast("Password reset link sent to your email!", "info");
  setTimeout(() => switchAuth("login"), 600);
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors(ids) {
  ids.forEach(id => { const el = document.getElementById(id); if(el) el.textContent = ""; });
}

function handleLogout() {
  localStorage.removeItem("user");
  loggedInUser = null;
  dashboardData = null;
  showToast("Logged out successfully.", "info");
  setTimeout(() => {
    showAuth();
    document.getElementById("login-form").reset();
  }, 600);
}

/* ──────────────────── NAVIGATION ──────────────────── */

function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  
  // Show target page
  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add("active");
  
  // Update sidebar active link
  document.querySelectorAll(".sidebar-link").forEach(l => {
    l.classList.toggle("active", l.dataset.page === page);
  });
  
  currentPage = page;
  
  // Close mobile sidebar
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("mobile-open");
    document.getElementById("sidebar-overlay").classList.add("hidden");
  }
}

/* ──────────────────── SIDEBAR ──────────────────── */

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const mainContent = document.getElementById("main-content");
  
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("mobile-open");
    overlay.classList.toggle("hidden", !sidebar.classList.contains("mobile-open"));
  } else {
    sidebar.classList.toggle("collapsed");
    mainContent.style.marginLeft = sidebar.classList.contains("collapsed") ? "68px" : "var(--sidebar-w)";
  }
}

function toggleCompactSidebar(checkbox) {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed", checkbox.checked);
  const mainContent = document.getElementById("main-content");
  mainContent.style.marginLeft = checkbox.checked ? "68px" : "var(--sidebar-w)";
}

/* ──────────────────── DARK MODE ──────────────────── */

function toggleDark() {
  isDark = !isDark;
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  const btn = document.getElementById("dark-toggle");
  if (btn) btn.innerHTML = `<i class="fas fa-${isDark ? "sun" : "moon"}"></i>`;
  const settingsToggle = document.getElementById("dark-toggle-settings");
  if (settingsToggle) settingsToggle.checked = isDark;
  setTimeout(initDashboardCharts, 100);
}

/* ──────────────────── DATE ──────────────────── */

function setTodayDate() {
  const el = document.getElementById("today-date");
  if (!el) return;
  const d = new Date();
  el.textContent = d.toLocaleDateString("en-IN", { weekday:"short", day:"numeric", month:"long", year:"numeric" });
}

/* ──────────────────── CHARTS ──────────────────── */

let cgpaChartInstance = null;
let attChartInstance = null;

function getChartColors() {
  const isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    text: isDarkMode ? "#94a3b8" : "#64748b",
    grid: isDarkMode ? "#1e2d45" : "#e2e8f0",
    bg: isDarkMode ? "#111827" : "#ffffff",
  };
}

function initDashboardCharts() {
  const colors = getChartColors();
  Chart.defaults.font.family = "'DM Sans', sans-serif";
  
  // CGPA Line Chart
  const cgpaCtx = document.getElementById("cgpaChart");
  if (cgpaCtx && !cgpaChartInstance) {
    cgpaChartInstance = new Chart(cgpaCtx, {
      type: "line",
      data: {
        labels: ["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5"],
        datasets: [{
          label: "SGPA",
          data: [8.20, 8.45, 8.90, 9.10, 8.80],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,.1)",
          borderWidth: 2.5,
          pointBackgroundColor: "#2563eb",
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: .4, fill: true,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 7, max: 10, grid: { color: colors.grid }, ticks: { color: colors.text, font: {size:11} } },
          x: { grid: { display: false }, ticks: { color: colors.text, font: {size:11} } }
        }
      }
    });
  }
  
  // Attendance Chart
  const attCtx = document.getElementById("attendanceChart");
  if (attCtx && !attChartInstance) {
    const attendanceData = dashboardData?.attendance || [];
    const pcts = attendanceData.length > 0 
      ? attendanceData.map(s => Math.round((s.attended/s.conducted)*100))
      : [87, 85, 88, 91, 86, 84];
    const labels = attendanceData.length > 0
      ? attendanceData.map(s => s.courseCode)
      : ["CSE3001", "CSE3002", "CSE3003", "CSE3004", "CSE3005", "CSE3006"];
    
    attChartInstance = new Chart(attCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Attendance %",
          data: pcts,
          backgroundColor: pcts.map(p => p >= 85 ? "rgba(16,185,129,.75)" : p >= 75 ? "rgba(245,158,11,.75)" : "rgba(239,68,68,.75)"),
          borderRadius: 6, borderSkipped: false,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 60, max: 100, grid: { color: colors.grid }, ticks: { color: colors.text, font:{size:11}, callback: v => v+"%" } },
          x: { grid: { display: false }, ticks: { color: colors.text, font:{size:11} } }
        }
      }
    });
  }
  
  // Spark lines
  initSparkline("sparkAttendance", [82, 84, 85, 86, 87, 87.4]);
  initSparkline("sparkCGPA", [8.20, 8.32, 8.52, 8.66, 8.69, 8.76]);
}

function initSparkline(id, data) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_,i) => i),
      datasets: [{ data, borderColor:"rgba(255,255,255,.7)", borderWidth:2, pointRadius:0, tension:.4, fill:false }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{enabled:false}},
      scales:{x:{display:false},y:{display:false}}
    }
  });
}

/* ──────────────────── ATTENDANCE TABLE ──────────────────── */

// Static attendance data for demo
const ATTENDANCE_DATA = [
  { code: "CSE3001", name: "Data Structures & Algorithms", faculty: "Dr. Arun Kumar", conducted: 52, attended: 48 },
  { code: "CSE3002", name: "Database Management Systems", faculty: "Dr. Priya Nair", conducted: 48, attended: 44 },
  { code: "CSE3003", name: "Machine Learning", faculty: "Dr. Venkat Rao", conducted: 50, attended: 40 },
  { code: "CSE3004", name: "Cloud Computing", faculty: "Dr. Meena S.", conducted: 46, attended: 43 },
  { code: "CSE3005", name: "Computer Networks", faculty: "Dr. Suresh P.", conducted: 48, attended: 42 },
  { code: "CSE3006", name: "Software Engineering", faculty: "Dr. Lakshmi R.", conducted: 40, attended: 31 },
];

function renderAttendanceTable() {
  const tbody = document.getElementById("attendance-table-body");
  if (!tbody) return;
  
  const attendanceToRender = dashboardData?.attendance || ATTENDANCE_DATA;
  
  tbody.innerHTML = attendanceToRender.map(s => {
    const pct = Math.round((s.attended / s.conducted) * 100);
    const cls = pct >= 85 ? "prog-green" : pct >= 75 ? "prog-amber" : "prog-red";
    const badgeCls = pct >= 85 ? "badge-green" : pct >= 75 ? "badge-gold" : "badge-red";
    const statusText = pct >= 75 ? "Good" : "Low";
    
    const rawCode = s.courseCode || s.code;
    const codeName = rawCode ? rawCode.split(" ")[0] : "—";
    
    return `<tr>
      <td><strong>${codeName}</strong></td>
      <td>${s.courseName || s.name || "—"}</td>
      <td>${s.faculty || "—"}</td>
      <td>${s.conducted || 0}</td>
      <td>${s.attended || 0}</td>
      <td>
        <div class="progress-wrap">
          <div class="progress-bar-bg"><div class="progress-bar-fill ${cls}" style="width:${pct}%"></div></div>
          <span class="prog-label" style="color:${pct>=85?'var(--green)':pct>=75?'var(--amber)':'var(--red)'}">${pct}%</span>
        </div>
      </td>
      <td><span class="badge ${badgeCls}">${statusText}</span></td>
    </tr>`;
  }).join("");
}

/* ──────────────────── MARKS DATA ──────────────────── */

const MARKS_DATA = {
  1: {
    sgpa: 8.20, credits: 22,
    subjects: [
      { code:"MAT1001", name:"Engineering Mathematics I", credits:4, internal:38, external:60, total:98, grade:"S", gp:10 },
      { code:"PHY1001", name:"Engineering Physics", credits:4, internal:35, external:55, total:90, grade:"S", gp:10 },
    ]
  },
  2: { sgpa: 8.45, credits: 22, subjects: [ { code:"MAT1002", name:"Engineering Mathematics II", credits:4, internal:36, external:58, total:94, grade:"S", gp:10 }] },
  3: { sgpa: 8.90, credits: 24, subjects: [ { code:"MAT2001", name:"Discrete Mathematics", credits:4, internal:38, external:60, total:98, grade:"S", gp:10 }] },
  4: { sgpa: 9.10, credits: 24, subjects: [ { code:"CSE2005", name:"Database Management Systems", credits:4, internal:39, external:60, total:99, grade:"S", gp:10 }] },
  5: { sgpa: 8.80, credits: 22, subjects: [ { code:"CSE3001", name:"Machine Learning", credits:4, internal:36, external:56, total:92, grade:"S", gp:10 }] },
  6: { sgpa: null, credits: 22, subjects: [ { code:"CSE4001", name:"Data Structures & Algorithms", credits:4, internal:null, external:null, total:null, grade:"—", gp:null }] },
  7: { sgpa: null, credits: null, subjects: [] },
  8: { sgpa: null, credits: null, subjects: [] },
};

function switchSem(sem) {
  currentSem = sem;
  document.querySelectorAll(".sem-tab").forEach(t => {
    t.classList.toggle("active", parseInt(t.dataset.sem) === sem);
  });
  renderMarksTable(sem);
}

function renderMarksTable(sem) {
  let data = null;
  // If we have API data for marks, search through it
  if (dashboardData && dashboardData.marks) {
    const semMarks = dashboardData.marks.filter(m => m.semester === sem);
    if (semMarks.length > 0) {
      data = {
        sgpa: semMarks[0].sgpa || null,
        credits: semMarks.reduce((acc, m) => acc + (m.credits || 0), 0),
        subjects: semMarks.map(m => ({
          code: m.courseCode || m.code,
          name: m.courseName || m.name,
          credits: m.credits,
          internal: m.internal,
          external: m.external,
          total: m.total,
          grade: m.grade,
          gp: m.gp
        }))
      };
      
      const totalCredits = data.subjects.reduce((a, s) => a + (s.credits || 0), 0);
      const totalPoints = data.subjects.reduce((a, s) => a + ((s.gp || 0) * (s.credits || 0)), 0);
      if (totalCredits > 0 && data.subjects.every(s => s.gp)) {
        data.sgpa = (totalPoints / totalCredits).toFixed(2);
      }
    }
  }
  
  if (!data) {
    data = MARKS_DATA[sem];
  }

  const headerEl = document.getElementById("marks-sem-header");
  const tbody = document.getElementById("marks-table-body");
  const footer = document.getElementById("marks-footer");
  if (!tbody) return;
  
  if (!data || !data.subjects || data.subjects.length === 0) {
    headerEl.innerHTML = `<h3>Semester ${sem}</h3><p>No data available for this semester yet.</p>`;
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:2rem;">Data not available</td></tr>`;
    footer.innerHTML = "";
    return;
  }
  
  headerEl.innerHTML = `<h3>Semester ${sem}</h3><p>Credits Registered: ${data.credits} · SGPA: ${data.sgpa ?? "Ongoing"}</p>`;
  
  tbody.innerHTML = data.subjects.map(s => {
    const gradeClass = s.grade === "S" ? "grade-S" : s.grade === "A" ? "grade-A" : s.grade === "B" ? "grade-B" : s.grade === "C" ? "grade-C" : "grade-na";
    return `<tr>
      <td><strong>${s.code}</strong></td>
      <td>${s.name}</td>
      <td>${s.credits}</td>
      <td>${s.internal ?? "—"}</td>
      <td>${s.external ?? "—"}</td>
      <td>${s.total ?? "—"}</td>
      <td><strong class="${gradeClass}">${s.grade}</strong></td>
      <td>${s.gp ?? "—"}</td>
    </tr>`;
  }).join("");
  
  if (data.sgpa) {
    const totalCreds = data.subjects.reduce((a,s) => a + s.credits, 0);
    const gradePoints = data.subjects.reduce((a,s) => a + (s.gp ? s.gp * s.credits : 0), 0);
    footer.innerHTML = `
      <div>SGPA: <strong>${data.sgpa}</strong></div>
      <div>Total Credits: <strong>${totalCreds}</strong></div>
      <div>Grade Points: <strong>${gradePoints}</strong></div>
      <span>Result: <strong style="color:var(--green)">PASSED</strong></span>
    `;
  } else {
    footer.innerHTML = `<span style="color:var(--text-muted)">Semester in progress. Results will be published after End Semester Examinations.</span>`;
  }
}

/* ──────────────────── ASSIGNMENTS ──────────────────── */

function renderAssignments() {
  const list = document.getElementById("assignment-list");
  const count = document.getElementById("sub-count");
  if (!list) return;
  
  const iconMap = { pdf: "fa-file-pdf", doc: "fa-file-word", zip: "fa-file-archive" };
  
  list.innerHTML = assignments.map((a, i) => `
    <li class="assignment-item">
      <div class="file-icon"><i class="fas ${iconMap[a.fileType || a.type] || 'fa-file'}"></i></div>
      <div class="assignment-info">
        <strong>${a.fileName || a.name}</strong>
        <small>${a.subject} · ${a.size} · Uploaded ${a.submittedDate ? new Date(a.submittedDate).toLocaleDateString() : a.date}</small>
      </div>
      <span class="badge badge-green" style="flex-shrink:0">${a.status}</span>
      <div class="assignment-actions">
        <button class="action-icon" title="Download"><i class="fas fa-download"></i></button>
        <button class="action-icon" title="Delete" onclick="deleteAssignment(${i})" style="color:var(--red)"><i class="fas fa-trash"></i></button>
      </div>
    </li>
  `).join("");
  
  if (count) count.textContent = `${assignments.length} Submitted`;
}

function handleFileUpload(e) {
  const files = Array.from(e.target.files);
  files.forEach(f => {
    const ext = f.name.split(".").pop().toLowerCase();
    const type = ext === "pdf" ? "pdf" : ["doc","docx"].includes(ext) ? "doc" : "zip";
    assignments.unshift({
      name: f.name,
      subject: "General Upload",
      size: formatFileSize(f.size),
      date: new Date().toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }),
      type, status: "Submitted"
    });
  });
  renderAssignments();
  showToast(`${files.length} file(s) uploaded successfully!`, "success");
  e.target.value = "";
}

function deleteAssignment(i) {
  if (confirm("Remove this submission?")) {
    assignments.splice(i, 1);
    renderAssignments();
    showToast("Assignment removed.", "info");
  }
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes/1024).toFixed(1) + " KB";
  return (bytes/1048576).toFixed(1) + " MB";
}

/* ──────────────────── NOTIFICATIONS ──────────────────── */

function renderNotifications(filter) {
  filter = filter || currentNotifFilter;
  const list = document.getElementById("notif-list");
  if (!list) return;
  
  const dataToRender = dashboardData?.notifications || NOTIFICATIONS_DATA;
  const filtered = filter === "all" ? dataToRender : dataToRender.filter(n => n.type === filter);
  
  list.innerHTML = filtered.map(n => {
    const rawId = n._id ? `'${n._id}'` : n.id;
    return `
    <div class="notif-item ${n.unread ? "unread" : ""}" onclick="markRead(${rawId})">
      <div class="notif-icon ${n.color || 'notif-blue'}"><i class="fas ${n.icon || 'fa-bell'}"></i></div>
      <div class="notif-content">
        <strong>${n.title}</strong>
        <p>${n.message || n.body}</p>
      </div>
      <div class="notif-meta">
        <span class="notif-time">${n.createdAt ? new Date(n.createdAt).toLocaleDateString() : n.time}</span>
        ${n.unread ? '<span class="notif-dot"></span>' : ''}
      </div>
    </div>
  `}).join("") || `<div style="text-align:center;padding:3rem;color:var(--text-muted)"><i class="fas fa-bell-slash" style="font-size:2rem;margin-bottom:.75rem;display:block"></i>No notifications here.</div>`;
}

function filterNotifs(type, btn) {
  currentNotifFilter = type;
  document.querySelectorAll(".notif-filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderNotifications(type);
}

async function markRead(id) {
  const n = dashboardData?.notifications?.find(n => n._id === id || n.id === id);
  if (!n) {
    const n2 = NOTIFICATIONS_DATA.find(n => n.id === id);
    if (n2) n2.unread = false;
  } else {
    n.unread = false;
    if (n._id) await markNotificationAsRead(n._id);
  }
  renderNotifications();
  
  // Update badge
  const allNotifs = dashboardData?.notifications || NOTIFICATIONS_DATA;
  const unreadCount = allNotifs.filter(n => n.unread).length;
  const badge = document.querySelector(".notif-badge");
  if (badge) { badge.textContent = unreadCount; badge.style.display = unreadCount ? "flex" : "none"; }
  const sbBadge = document.querySelector('.sidebar-badge');
  if (sbBadge) { sbBadge.textContent = unreadCount; sbBadge.style.display = unreadCount ? "inline-flex" : "none"; }
}

/* ──────────────────── LEAVE FORM ──────────────────── */

function submitLeave(e) {
  e.preventDefault();
  const type = document.getElementById("leave-type").value;
  const from = document.getElementById("leave-from").value;
  const to = document.getElementById("leave-to").value;
  const reason = document.getElementById("leave-reason").value.trim();
  
  if (!from || !to) { showToast("Please select both From and To dates.", "warning"); return; }
  if (!reason) { showToast("Please provide a reason for leave.", "warning"); return; }
  if (new Date(from) > new Date(to)) { showToast("From date cannot be after To date.", "error"); return; }
  
  const days = Math.ceil((new Date(to) - new Date(from)) / (1000*60*60*24)) + 1;
  showToast(`${type} application for ${days} day(s) submitted successfully!`, "success");
  e.target.reset();
}

/* ──────────────────── FEE PAYMENT ──────────────────── */

function showPayNow() {
  document.getElementById("pay-modal").classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

function processPayment() {
  closeModal("pay-modal");
  showToast("Processing payment…", "info");
  setTimeout(() => showToast("Payment of ₹2,15,000 successful! Ref: VIT2026070001", "success"), 2000);
}

function downloadReceipt() {
  showToast("Fee receipt downloaded!", "success");
}

/* ──────────────────── TOAST ──────────────────── */

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const icons = { success:"fa-check-circle", error:"fa-times-circle", info:"fa-info-circle", warning:"fa-exclamation-triangle" };
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("out");
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* ──────────────────── PARTICLES ──────────────────── */

function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  
  for (let i = 0; i < 15; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 60 + 20;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;
    const x = Math.random() * 100;
    
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = x + "%";
    p.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
    container.appendChild(p);
  }
}

/* ──────────────────── DRAG & DROP UPLOAD ──────────────────── */

const uploadZone = document.getElementById("upload-zone");
if (uploadZone) {
  uploadZone.addEventListener("dragover", e => {
    e.preventDefault();
    uploadZone.style.borderColor = "var(--primary)";
    uploadZone.style.background = "var(--primary-light)";
  });
  uploadZone.addEventListener("dragleave", () => {
    uploadZone.style.borderColor = "";
    uploadZone.style.background = "";
  });
  uploadZone.addEventListener("drop", e => {
    e.preventDefault();
    uploadZone.style.borderColor = "";
    uploadZone.style.background = "";
    const fakeEvent = { target: { files: e.dataTransfer.files, value: "" }, preventDefault: ()=>{} };
    handleFileUpload(fakeEvent);
  });
}

/* ──────────────────── PAYMENT OPTIONS ──────────────────── */

document.addEventListener("click", e => {
  if (e.target.closest(".pay-opt")) {
    document.querySelectorAll(".pay-opt").forEach(b => b.classList.remove("active"));
    e.target.closest(".pay-opt").classList.add("active");
  }
});

/* ──────────────────── KEYBOARD SHORTCUTS ──────────────────── */

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    const modals = document.querySelectorAll(".modal-overlay:not(.hidden)");
    modals.forEach(m => m.classList.add("hidden"));
  }
});

/* ──────────────────── RESPONSIVE ──────────────────── */

window.addEventListener("resize", () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  if (window.innerWidth > 768) {
    sidebar.classList.remove("mobile-open");
    overlay.classList.add("hidden");
  }
});

/* ──────────────────── GLOBAL EXPORTS ──────────────────── */

window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.showForgot = showForgot;
window.switchAuth = switchAuth;
window.togglePass = togglePass;
window.handleLogout = handleLogout;

window.navigateTo = navigateTo;
window.toggleSidebar = toggleSidebar;
window.toggleDark = toggleDark;
window.toggleCompactSidebar = toggleCompactSidebar;

window.switchSem = switchSem;
window.renderAssignments = renderAssignments;
window.deleteAssignment = deleteAssignment;
window.handleFileUpload = handleFileUpload;
window.formatFileSize = formatFileSize;

window.filterNotifs = filterNotifs;
window.markRead = markRead;

window.submitLeave = submitLeave;
window.showPayNow = showPayNow;
window.closeModal = closeModal;
window.processPayment = processPayment;
window.downloadReceipt = downloadReceipt;
window.showToast = showToast;
