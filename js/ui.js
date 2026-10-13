/* ============================================================
   ui.js — Reusable UI components
   Toast, Modal, Sidebar, Navbar, Skeleton, Status badges, etc.
   ============================================================ */

/* ---------- Toast Notifications ---------- */
function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container') || createToastContainer();
  const icons = {
    success: 'check-circle',
    error: 'x-circle',
    warning: 'alert-triangle',
    info: 'info'
  };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i data-lucide="${icons[type] || 'info'}"></i>
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i data-lucide="x"></i>
    </button>
  `;
  container.appendChild(toast);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Animate in
  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  document.body.appendChild(container);
  return container;
}

/* ---------- Confirmation Modal ---------- */
function showConfirmDialog(title, message, onConfirm, confirmText = 'Confirm', type = 'danger') {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.innerHTML = `
    <div class="modal confirm-modal">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" data-action="cancel"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <p>${message}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-action="cancel">Cancel</button>
        <button class="btn btn-${type}" data-action="confirm">${confirmText}</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  overlay.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'cancel' || e.target === overlay) {
      overlay.remove();
    } else if (action === 'confirm') {
      overlay.remove();
      onConfirm();
    }
  });
}

/* ---------- Generic Modal ---------- */
function showModal(title, bodyHTML, footerHTML = '') {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'generic-modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">${bodyHTML}</div>
      ${footerHTML ? `<div class="modal-footer">${footerHTML}</div>` : ''}
    </div>
  `;
  document.body.appendChild(overlay);
  if (typeof lucide !== 'undefined') lucide.createIcons();

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

function closeModal() {
  const overlay = document.getElementById('generic-modal-overlay');
  if (overlay) overlay.remove();
}

/* ---------- Status Badges ---------- */
function statusBadge(status) {
  const cls = {
    'Pending': 'badge-warning',
    'Assigned': 'badge-info',
    'In Progress': 'badge-primary',
    'Resolved': 'badge-success',
    'Closed': 'badge-muted'
  };
  return `<span class="badge ${cls[status] || 'badge-muted'}">${status}</span>`;
}

function priorityBadge(priority) {
  const cls = {
    'Low': 'badge-muted',
    'Medium': 'badge-info',
    'High': 'badge-warning',
    'Urgent': 'badge-danger'
  };
  return `<span class="badge ${cls[priority] || 'badge-muted'}">${priority}</span>`;
}

/* ---------- Skeleton Loader ---------- */
function showSkeleton(container, count = 3) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="skeleton-card">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    `;
  }
  container.innerHTML = html;
}

/* ---------- Empty State ---------- */
function emptyState(icon, title, message, actionHTML = '') {
  return `
    <div class="empty-state">
      <div class="empty-state-icon"><i data-lucide="${icon}"></i></div>
      <h3>${title}</h3>
      <p>${message}</p>
      ${actionHTML}
    </div>
  `;
}

/* ---------- Format Dates ---------- */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return formatDate(dateStr);
}

/* ---------- Sidebar & Navbar ---------- */
function renderDashboardLayout(role, activePage) {
  const session = getSession();
  if (!session) return;

  const menuItems = getMenuItems(role);
  const user = getCurrentUser();

  // Sidebar
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <div class="brand-icon"><i data-lucide="shield-check"></i></div>
          <span class="brand-text">SCMS</span>
        </div>
        <button class="sidebar-toggle" id="sidebar-toggle-btn"><i data-lucide="panel-left-close"></i></button>
      </div>
      <nav class="sidebar-nav">
        <ul>
          ${menuItems.map(item => `
            <li>
              <a href="${item.href}" class="sidebar-link ${activePage === item.id ? 'active' : ''}">
                <i data-lucide="${item.icon}"></i>
                <span>${item.label}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="user-avatar">${user ? user.name.charAt(0).toUpperCase() : 'U'}</div>
          <div class="user-info">
            <span class="user-name">${user ? user.name : 'User'}</span>
            <span class="user-role">${capitalize(session.role)}</span>
          </div>
        </div>
        <a href="#" class="sidebar-link" onclick="logoutUser(); return false;">
          <i data-lucide="log-out"></i>
          <span>Logout</span>
        </a>
      </div>
    `;
  }

  // Top bar
  const topbar = document.getElementById('topbar');
  if (topbar) {
    topbar.innerHTML = `
      <button class="mobile-menu-btn" id="mobile-menu-btn"><i data-lucide="menu"></i></button>
      <div class="topbar-title">
        <h2>${menuItems.find(m => m.id === activePage)?.label || 'Dashboard'}</h2>
      </div>
      <div class="topbar-actions">
        <div class="topbar-user" id="topbar-user-toggle">
          <div class="user-avatar-sm">${user ? user.name.charAt(0).toUpperCase() : 'U'}</div>
          <span class="user-name-topbar">${user ? user.name : ''}</span>
          <i data-lucide="chevron-down" class="topbar-chevron"></i>
        </div>
        <div class="topbar-dropdown" id="topbar-dropdown">
          <a href="profile.html"><i data-lucide="user"></i> Profile</a>
          <a href="settings.html"><i data-lucide="settings"></i> Settings</a>
          <hr>
          <a href="#" onclick="logoutUser(); return false;"><i data-lucide="log-out"></i> Logout</a>
        </div>
      </div>
    `;
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
  initSidebarToggle();
}

function getMenuItems(role) {
  const citizen = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', href: 'citizen-dashboard.html' },
    { id: 'new-complaint', label: 'New Complaint', icon: 'plus-circle', href: 'new-complaint.html' },
    { id: 'my-complaints', label: 'My Complaints', icon: 'file-text', href: 'my-complaints.html' },
    { id: 'profile', label: 'Profile', icon: 'user', href: 'profile.html' },
    { id: 'settings', label: 'Settings', icon: 'settings', href: 'settings.html' }
  ];
  const staff = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', href: 'staff-dashboard.html' },
    { id: 'assigned', label: 'Assigned Complaints', icon: 'clipboard-list', href: 'assigned-complaints.html' },
    { id: 'completed', label: 'Completed', icon: 'check-circle', href: 'completed-complaints.html' },
    { id: 'reports', label: 'Reports', icon: 'bar-chart-3', href: 'staff-reports.html' },
    { id: 'profile', label: 'Profile', icon: 'user', href: 'profile.html' }
  ];
  const admin = [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', href: 'admin-dashboard.html' },
    { id: 'complaints', label: 'Manage Complaints', icon: 'file-text', href: 'manage-complaints.html' },
    { id: 'users', label: 'Manage Users', icon: 'users', href: 'manage-users.html' },
    { id: 'departments', label: 'Departments', icon: 'building-2', href: 'manage-departments.html' },
    { id: 'assign', label: 'Assign Complaints', icon: 'user-check', href: 'assign-complaints.html' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'bar-chart-3', href: 'reports.html' },
    { id: 'settings', label: 'Settings', icon: 'settings', href: 'settings.html' }
  ];
  if (role === 'admin') return admin;
  if (role === 'staff') return staff;
  return citizen;
}

function initSidebarToggle() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const mobileBtn = document.getElementById('mobile-menu-btn');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      document.querySelector('.main-content')?.classList.toggle('sidebar-collapsed');
    });
  }
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Close mobile sidebar on link click
  sidebar?.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
    });
  });

  // Close mobile sidebar on outside click
  document.addEventListener('click', (e) => {
    if (sidebar?.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== mobileBtn && !mobileBtn?.contains(e.target)) {
      sidebar.classList.remove('mobile-open');
    }
  });

  // Topbar dropdown
  const userToggle = document.getElementById('topbar-user-toggle');
  const dropdown = document.getElementById('topbar-dropdown');
  if (userToggle && dropdown) {
    userToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
  }
}

/* ---------- Helpers ---------- */
function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function truncate(str, len = 60) {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '…' : str;
}

function getCategoryIcon(category) {
  const icons = {
    'Infrastructure': 'hard-hat',
    'Water Supply': 'droplets',
    'Electricity': 'zap',
    'Sanitation': 'trash-2',
    'Transportation': 'bus',
    'Public Safety': 'shield',
    'Other': 'layers'
  };
  return icons[category] || 'layers';
}

/* ---------- Pagination ---------- */
function paginate(items, page = 1, perPage = 10) {
  const totalPages = Math.ceil(items.length / perPage);
  const start = (page - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page,
    totalPages,
    total: items.length
  };
}

function renderPagination(container, currentPage, totalPages, onPageChange) {
  if (totalPages <= 1) { container.innerHTML = ''; return; }
  let html = '<div class="pagination">';
  html += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="(${onPageChange.name})(${currentPage - 1})"><i data-lucide="chevron-left"></i></button>`;
  
  for (let i = 1; i <= totalPages; i++) {
    if (totalPages > 7 && i > 2 && i < totalPages - 1 && Math.abs(i - currentPage) > 1) {
      if (i === 3 || i === totalPages - 2) html += '<span class="pagination-dots">…</span>';
      continue;
    }
    html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="(${onPageChange.name})(${i})">${i}</button>`;
  }
  
  html += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="(${onPageChange.name})(${currentPage + 1})"><i data-lucide="chevron-right"></i></button>`;
  html += '</div>';
  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* ---------- Public Navbar ---------- */
function renderPublicNavbar(activePage) {
  const session = getSession();
  const nav = document.getElementById('public-navbar');
  if (!nav) return;
  nav.innerHTML = `
    <div class="container navbar-inner">
      <a href="index.html" class="navbar-brand">
        <div class="brand-icon"><i data-lucide="shield-check"></i></div>
        <span>SCMS</span>
      </a>
      <button class="navbar-toggler" id="navbar-toggler"><i data-lucide="menu"></i></button>
      <div class="navbar-menu" id="navbar-menu">
        <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
        <a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">About</a>
        <a href="services.html" class="nav-link ${activePage === 'services' ? 'active' : ''}">Services</a>
        <a href="contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact</a>
        ${session
          ? `<a href="#" class="nav-link btn btn-primary btn-sm" onclick="redirectToDashboard('${session.role}'); return false;">Dashboard</a>`
          : `<a href="login.html" class="nav-link">Login</a>
             <a href="register.html" class="btn btn-primary btn-sm">Register</a>`
        }
      </div>
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();

  document.getElementById('navbar-toggler')?.addEventListener('click', () => {
    document.getElementById('navbar-menu')?.classList.toggle('open');
  });
}

/* ---------- Public Footer ---------- */
function renderPublicFooter() {
  const footer = document.getElementById('public-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-col">
        <div class="footer-brand">
          <div class="brand-icon"><i data-lucide="shield-check"></i></div>
          <span>SCMS</span>
        </div>
        <p>Smart Complaint Management System — empowering citizens to voice concerns and track resolutions transparently.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Portal</h4>
        <a href="login.html">Login</a>
        <a href="register.html">Register</a>
        <a href="login.html">Track Complaint</a>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <p><i data-lucide="mail"></i> support@scms.demo</p>
        <p><i data-lucide="phone"></i> +91 98765 43210</p>
        <p><i data-lucide="map-pin"></i> City Hall, Demo City</p>
      </div>
    </div>
    <div class="footer-bottom container">
      <p>&copy; ${new Date().getFullYear()} Smart Complaint Management System. All rights reserved.</p>
      <p class="footer-note">This is a demonstration project. Not for production use.</p>
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
