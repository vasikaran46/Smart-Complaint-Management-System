/* ============================================================
   storage.js — Data Layer (localStorage)
   Versioned schema, seed data, CRUD helpers
   ============================================================ */

const STORAGE_VERSION_KEY = 'scms_version';
const STORAGE_VERSION = '1.0.0';

/* ---------- helpers ---------- */
function generateId(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

function now() {
  return new Date().toISOString();
}

function safeGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ---------- Seed / Reset ---------- */
function seedDemoData() {
  const timestamp = now();

  // Departments
  const departments = [
    { id: 'dept_infra', name: 'Infrastructure', description: 'Roads, buildings, public infrastructure maintenance', staffIds: ['staff_001', 'staff_002'] },
    { id: 'dept_water', name: 'Water Supply', description: 'Water supply, pipelines, water quality issues', staffIds: ['staff_003'] },
    { id: 'dept_elec', name: 'Electricity', description: 'Power supply, electrical faults, streetlights', staffIds: ['staff_004'] },
    { id: 'dept_sanit', name: 'Sanitation', description: 'Waste management, drainage, cleanliness', staffIds: ['staff_005'] },
    { id: 'dept_transport', name: 'Transportation', description: 'Public transport, traffic management, road safety', staffIds: [] },
    { id: 'dept_safety', name: 'Public Safety', description: 'Emergency services, security, public safety concerns', staffIds: [] }
  ];

  // Users
  const users = [
    { id: 'admin_001', name: 'Admin User', email: 'admin@demo.com', phone: '9876543210', password: 'demo1234', role: 'admin', departmentId: null, createdAt: timestamp, active: true },
    { id: 'staff_001', name: 'Rahul Sharma', email: 'staff@demo.com', phone: '9876543211', password: 'demo1234', role: 'staff', departmentId: 'dept_infra', createdAt: timestamp, active: true },
    { id: 'staff_002', name: 'Priya Patel', email: 'priya.staff@demo.com', phone: '9876543212', password: 'demo1234', role: 'staff', departmentId: 'dept_infra', createdAt: timestamp, active: true },
    { id: 'staff_003', name: 'Arun Kumar', email: 'arun.staff@demo.com', phone: '9876543213', password: 'demo1234', role: 'staff', departmentId: 'dept_water', createdAt: timestamp, active: true },
    { id: 'staff_004', name: 'Meera Nair', email: 'meera.staff@demo.com', phone: '9876543214', password: 'demo1234', role: 'staff', departmentId: 'dept_elec', createdAt: timestamp, active: true },
    { id: 'staff_005', name: 'Vikram Singh', email: 'vikram.staff@demo.com', phone: '9876543215', password: 'demo1234', role: 'staff', departmentId: 'dept_sanit', createdAt: timestamp, active: true },
    { id: 'citizen_001', name: 'Citizen User', email: 'citizen@demo.com', phone: '9876543216', password: 'demo1234', role: 'citizen', departmentId: null, createdAt: timestamp, active: true },
    { id: 'citizen_002', name: 'Ananya Gupta', email: 'ananya@demo.com', phone: '9876543217', password: 'demo1234', role: 'citizen', departmentId: null, createdAt: timestamp, active: true },
    { id: 'citizen_003', name: 'Karthik Rajan', email: 'karthik@demo.com', phone: '9876543218', password: 'demo1234', role: 'citizen', departmentId: null, createdAt: timestamp, active: true }
  ];

  // Complaints — spread across statuses and categories
  const complaints = [
    {
      id: 'CMP-1001', title: 'Pothole on Main Road', description: 'Large pothole near the central market area causing accidents. Multiple vehicles have been damaged. Needs immediate repair.', category: 'Infrastructure', location: 'MG Road, Sector 12',
      priority: 'High', status: 'Resolved', image: null, citizenId: 'citizen_001', departmentId: 'dept_infra', assignedStaffId: 'staff_001',
      createdAt: '2026-09-15T10:30:00.000Z', updatedAt: '2026-09-22T14:00:00.000Z', resolutionNotes: 'Road has been repaired and resurfaced. Quality inspection completed.'
    },
    {
      id: 'CMP-1002', title: 'Water Supply Disruption in Block C', description: 'No water supply for the past 3 days in residential Block C. Over 200 families affected.', category: 'Water Supply', location: 'Block C, Green Valley Township',
      priority: 'Urgent', status: 'In Progress', image: null, citizenId: 'citizen_001', departmentId: 'dept_water', assignedStaffId: 'staff_003',
      createdAt: '2026-10-01T08:15:00.000Z', updatedAt: '2026-10-05T11:20:00.000Z', resolutionNotes: ''
    },
    {
      id: 'CMP-1003', title: 'Streetlights Not Working', description: 'Multiple streetlights on Park Avenue have been non-functional for a week. Safety concern for pedestrians at night.', category: 'Electricity', location: 'Park Avenue, Zone 4',
      priority: 'Medium', status: 'Assigned', image: null, citizenId: 'citizen_002', departmentId: 'dept_elec', assignedStaffId: 'staff_004',
      createdAt: '2026-10-03T16:45:00.000Z', updatedAt: '2026-10-04T09:00:00.000Z', resolutionNotes: ''
    },
    {
      id: 'CMP-1004', title: 'Garbage Collection Missed', description: 'Regular garbage collection has been missed for 5 consecutive days in our lane. Piling waste is attracting stray animals.', category: 'Sanitation', location: 'Lane 7, Rose Garden Colony',
      priority: 'High', status: 'Pending', image: null, citizenId: 'citizen_002', departmentId: null, assignedStaffId: null,
      createdAt: '2026-10-10T07:00:00.000Z', updatedAt: '2026-10-10T07:00:00.000Z', resolutionNotes: ''
    },
    {
      id: 'CMP-1005', title: 'Broken Park Bench', description: 'The wooden bench near the fountain in Central Park is broken and has exposed nails. Could injure children.', category: 'Infrastructure', location: 'Central Park, Main Area',
      priority: 'Low', status: 'Closed', image: null, citizenId: 'citizen_003', departmentId: 'dept_infra', assignedStaffId: 'staff_002',
      createdAt: '2026-08-20T12:00:00.000Z', updatedAt: '2026-09-01T16:30:00.000Z', resolutionNotes: 'Bench replaced with a new steel bench. Area cleaned.'
    },
    {
      id: 'CMP-1006', title: 'Traffic Signal Malfunction', description: 'Traffic signal at the Main Road and Highway 5 junction is blinking continuously. Causing traffic jams during peak hours.', category: 'Transportation', location: 'MG Road & Highway 5 Junction',
      priority: 'Urgent', status: 'In Progress', image: null, citizenId: 'citizen_003', departmentId: 'dept_infra', assignedStaffId: 'staff_001',
      createdAt: '2026-10-08T09:30:00.000Z', updatedAt: '2026-10-09T10:00:00.000Z', resolutionNotes: ''
    },
    {
      id: 'CMP-1007', title: 'Overflowing Drain near School', description: 'The main drain near the government school is overflowing, creating unsanitary conditions for school children.', category: 'Sanitation', location: 'Near Government School, Ward 3',
      priority: 'High', status: 'Assigned', image: null, citizenId: 'citizen_001', departmentId: 'dept_sanit', assignedStaffId: 'staff_005',
      createdAt: '2026-10-11T11:00:00.000Z', updatedAt: '2026-10-12T08:30:00.000Z', resolutionNotes: ''
    },
    {
      id: 'CMP-1008', title: 'Low Water Pressure Issue', description: 'Extremely low water pressure in morning hours making it difficult for daily needs. Issue persistent for 2 weeks.', category: 'Water Supply', location: 'Sector 8, Lakshmi Nagar',
      priority: 'Medium', status: 'Pending', image: null, citizenId: 'citizen_003', departmentId: null, assignedStaffId: null,
      createdAt: '2026-10-12T14:20:00.000Z', updatedAt: '2026-10-12T14:20:00.000Z', resolutionNotes: ''
    },
    {
      id: 'CMP-1009', title: 'Power Outage in Industrial Area', description: 'Frequent power outages lasting 4-5 hours daily in the industrial area. Affecting businesses and workers.', category: 'Electricity', location: 'Industrial Area, Phase 2',
      priority: 'High', status: 'Resolved', image: null, citizenId: 'citizen_002', departmentId: 'dept_elec', assignedStaffId: 'staff_004',
      createdAt: '2026-09-25T10:00:00.000Z', updatedAt: '2026-10-02T15:45:00.000Z', resolutionNotes: 'Faulty transformer replaced. Power supply stabilized and tested for 48 hours.'
    },
    {
      id: 'CMP-1010', title: 'Unsafe Building Construction', description: 'Unauthorized construction happening without safety measures near the children\'s park. Debris falling on the road.', category: 'Public Safety', location: 'Near Children\'s Park, Phase 1',
      priority: 'Urgent', status: 'Pending', image: null, citizenId: 'citizen_001', departmentId: null, assignedStaffId: null,
      createdAt: '2026-10-13T06:00:00.000Z', updatedAt: '2026-10-13T06:00:00.000Z', resolutionNotes: ''
    }
  ];

  // Complaint History
  const complaintHistory = [
    { id: generateId('h_'), complaintId: 'CMP-1001', previousStatus: null, newStatus: 'Pending', remarks: 'Complaint submitted', updatedBy: 'citizen_001', updatedAt: '2026-09-15T10:30:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1001', previousStatus: 'Pending', newStatus: 'Assigned', remarks: 'Assigned to Infrastructure department', updatedBy: 'admin_001', updatedAt: '2026-09-16T09:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1001', previousStatus: 'Assigned', newStatus: 'In Progress', remarks: 'Repair team dispatched', updatedBy: 'staff_001', updatedAt: '2026-09-18T10:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1001', previousStatus: 'In Progress', newStatus: 'Resolved', remarks: 'Road repaired and resurfaced', updatedBy: 'staff_001', updatedAt: '2026-09-22T14:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1002', previousStatus: null, newStatus: 'Pending', remarks: 'Complaint submitted', updatedBy: 'citizen_001', updatedAt: '2026-10-01T08:15:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1002', previousStatus: 'Pending', newStatus: 'Assigned', remarks: 'Assigned to Water Supply department', updatedBy: 'admin_001', updatedAt: '2026-10-02T09:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1002', previousStatus: 'Assigned', newStatus: 'In Progress', remarks: 'Pipeline inspection underway', updatedBy: 'staff_003', updatedAt: '2026-10-05T11:20:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1003', previousStatus: null, newStatus: 'Pending', remarks: 'Complaint submitted', updatedBy: 'citizen_002', updatedAt: '2026-10-03T16:45:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1003', previousStatus: 'Pending', newStatus: 'Assigned', remarks: 'Assigned to Electricity department', updatedBy: 'admin_001', updatedAt: '2026-10-04T09:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1005', previousStatus: null, newStatus: 'Pending', remarks: 'Complaint submitted', updatedBy: 'citizen_003', updatedAt: '2026-08-20T12:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1005', previousStatus: 'Pending', newStatus: 'Assigned', remarks: 'Assigned to Infrastructure', updatedBy: 'admin_001', updatedAt: '2026-08-21T09:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1005', previousStatus: 'Assigned', newStatus: 'In Progress', remarks: 'Repair started', updatedBy: 'staff_002', updatedAt: '2026-08-25T10:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1005', previousStatus: 'In Progress', newStatus: 'Resolved', remarks: 'Bench replaced', updatedBy: 'staff_002', updatedAt: '2026-08-30T14:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1005', previousStatus: 'Resolved', newStatus: 'Closed', remarks: 'Verified and closed', updatedBy: 'admin_001', updatedAt: '2026-09-01T16:30:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1006', previousStatus: null, newStatus: 'Pending', remarks: 'Complaint submitted', updatedBy: 'citizen_003', updatedAt: '2026-10-08T09:30:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1006', previousStatus: 'Pending', newStatus: 'Assigned', remarks: 'Assigned for urgent review', updatedBy: 'admin_001', updatedAt: '2026-10-08T11:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1006', previousStatus: 'Assigned', newStatus: 'In Progress', remarks: 'Electrician team dispatched', updatedBy: 'staff_001', updatedAt: '2026-10-09T10:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1009', previousStatus: null, newStatus: 'Pending', remarks: 'Complaint submitted', updatedBy: 'citizen_002', updatedAt: '2026-09-25T10:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1009', previousStatus: 'Pending', newStatus: 'Assigned', remarks: 'Assigned to Electricity', updatedBy: 'admin_001', updatedAt: '2026-09-26T09:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1009', previousStatus: 'Assigned', newStatus: 'In Progress', remarks: 'Investigating cause', updatedBy: 'staff_004', updatedAt: '2026-09-28T10:00:00.000Z' },
    { id: generateId('h_'), complaintId: 'CMP-1009', previousStatus: 'In Progress', newStatus: 'Resolved', remarks: 'Transformer replaced', updatedBy: 'staff_004', updatedAt: '2026-10-02T15:45:00.000Z' }
  ];

  safeSet('scms_users', users);
  safeSet('scms_complaints', complaints);
  safeSet('scms_history', complaintHistory);
  safeSet('scms_departments', departments);
  safeSet(STORAGE_VERSION_KEY, STORAGE_VERSION);
}

function initStorage() {
  const ver = localStorage.getItem(STORAGE_VERSION_KEY);
  if (ver !== STORAGE_VERSION) {
    seedDemoData();
  }
}

function resetDemoData() {
  localStorage.removeItem('scms_users');
  localStorage.removeItem('scms_complaints');
  localStorage.removeItem('scms_history');
  localStorage.removeItem('scms_departments');
  localStorage.removeItem(STORAGE_VERSION_KEY);
  localStorage.removeItem('scms_session');
  seedDemoData();
}

/* ========== GENERIC CRUD ========== */
function getAll(key) {
  return safeGet(key) || [];
}

function getById(key, id) {
  return getAll(key).find(item => item.id === id) || null;
}

function addItem(key, item) {
  const list = getAll(key);
  list.push(item);
  safeSet(key, list);
  return item;
}

function updateItem(key, id, updates) {
  const list = getAll(key);
  const idx = list.findIndex(item => item.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  safeSet(key, list);
  return list[idx];
}

function deleteItem(key, id) {
  const list = getAll(key);
  const filtered = list.filter(item => item.id !== id);
  safeSet(key, filtered);
  return filtered.length < list.length;
}

/* ========== DOMAIN ACCESSORS ========== */

// Users
function getUsers() { return getAll('scms_users'); }
function getUserById(id) { return getById('scms_users', id); }
function getUserByEmail(email) { return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()); }
function addUser(user) { return addItem('scms_users', user); }
function updateUser(id, updates) { return updateItem('scms_users', id, updates); }
function deleteUser(id) { return deleteItem('scms_users', id); }

// Complaints
function getComplaints() { return getAll('scms_complaints'); }
function getComplaintById(id) { return getById('scms_complaints', id); }
function addComplaint(complaint) { return addItem('scms_complaints', complaint); }
function updateComplaint(id, updates) { return updateItem('scms_complaints', id, { ...updates, updatedAt: now() }); }
function deleteComplaint(id) { return deleteItem('scms_complaints', id); }

function getComplaintsByUser(userId) { return getComplaints().filter(c => c.citizenId === userId); }
function getComplaintsByDepartment(deptId) { return getComplaints().filter(c => c.departmentId === deptId); }
function getComplaintsByStaff(staffId) { return getComplaints().filter(c => c.assignedStaffId === staffId); }

function generateComplaintId() {
  const complaints = getComplaints();
  const maxNum = complaints.reduce((max, c) => {
    const num = parseInt(c.id.replace('CMP-', ''));
    return num > max ? num : max;
  }, 1000);
  return `CMP-${maxNum + 1}`;
}

// Complaint History
function getComplaintHistory(complaintId) {
  return getAll('scms_history').filter(h => h.complaintId === complaintId).sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
}
function addComplaintHistory(entry) { return addItem('scms_history', entry); }

// Departments
function getDepartments() { return getAll('scms_departments'); }
function getDepartmentById(id) { return getById('scms_departments', id); }
function addDepartment(dept) { return addItem('scms_departments', dept); }
function updateDepartment(id, updates) { return updateItem('scms_departments', id, updates); }
function deleteDepartment(id) { return deleteItem('scms_departments', id); }

/* ========== STATISTICS ========== */
function getComplaintStats() {
  const complaints = getComplaints();
  return {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    assigned: complaints.filter(c => c.status === 'Assigned').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    closed: complaints.filter(c => c.status === 'Closed').length
  };
}

function getUserStats() {
  const users = getUsers();
  return {
    total: users.length,
    citizens: users.filter(u => u.role === 'citizen').length,
    staff: users.filter(u => u.role === 'staff').length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.active).length
  };
}

// Initialize on load
initStorage();
