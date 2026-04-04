const BASE_URL = "http://localhost:5000/api";

// Auth APIs
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

export async function loginUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
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

// User Profile APIs
export async function getUserProfile(userId) {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}/profile`);
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}

export async function updateUserProfile(userId, data) {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}/profile`, {
      method: "PUT",
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

// Academic Data APIs
export async function getUserAttendance(userId) {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}/attendance`);
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}

export async function getUserMarks(userId) {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}/marks`);
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}

export async function getUserDashboardData(userId) {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}/dashboard`);
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}

// Notifications APIs
export async function getUserNotifications(userId) {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}/notifications`);
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}

export async function markNotificationAsRead(notificationId) {
  try {
    const res = await fetch(`${BASE_URL}/notification/${notificationId}/read`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}

// Assignments APIs
export async function getUserAssignments(userId) {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}/assignments`);
    return await res.json();
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}
