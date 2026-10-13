/* ============================================================
   auth.js — Authentication & Session (Demo / localStorage)
   ============================================================ */

const SESSION_KEY = 'scms_session';

/* ---------- Session ---------- */
function setSession(user) {
  const session = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    departmentId: user.departmentId,
    loggedInAt: now()
  };
  safeSet(SESSION_KEY, session);
  return session;
}

function getSession() {
  return safeGet(SESSION_KEY);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
  return !!getSession();
}

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  return getUserById(session.userId);
}

/* ---------- Login ---------- */
function loginUser(email, password) {
  const user = getUserByEmail(email);
  if (!user) return { success: false, message: 'No account found with this email address.' };
  if (!user.active) return { success: false, message: 'This account has been deactivated. Contact an administrator.' };
  if (user.password !== password) return { success: false, message: 'Incorrect password. Please try again.' };
  setSession(user);
  return { success: true, user };
}

/* ---------- Register ---------- */
function registerUser(data) {
  // Validation
  if (!data.name || !data.email || !data.phone || !data.password) {
    return { success: false, message: 'All fields are required.' };
  }
  if (!isValidEmail(data.email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }
  if (data.password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters.' };
  }
  if (data.password !== data.confirmPassword) {
    return { success: false, message: 'Passwords do not match.' };
  }
  if (getUserByEmail(data.email)) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const user = {
    id: generateId('user_'),
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    password: data.password,
    role: 'citizen', // Public registration always creates citizen accounts
    departmentId: null,
    createdAt: now(),
    active: true
  };

  addUser(user);
  setSession(user);
  return { success: true, user };
}

/* ---------- Logout ---------- */
function logoutUser() {
  clearSession();
  window.location.href = 'index.html';
}

/* ---------- Route Guards ---------- */
function requireAuth(allowedRoles) {
  const session = getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  if (allowedRoles && !allowedRoles.includes(session.role)) {
    // Redirect to their own dashboard
    redirectToDashboard(session.role);
    return null;
  }
  return session;
}

function redirectToDashboard(role) {
  switch (role) {
    case 'admin': window.location.href = 'admin-dashboard.html'; break;
    case 'staff': window.location.href = 'staff-dashboard.html'; break;
    case 'citizen': window.location.href = 'citizen-dashboard.html'; break;
    default: window.location.href = 'index.html';
  }
}

function redirectIfLoggedIn() {
  const session = getSession();
  if (session) {
    redirectToDashboard(session.role);
  }
}

/* ---------- Validation Helpers ---------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9]{10,15}$/.test(phone.replace(/[\s\-\+\(\)]/g, ''));
}
