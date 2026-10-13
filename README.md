# Smart Complaint Management System (SCMS)

> A modern, responsive, zero-dependency civic grievance redressal and tracking web portal built with **HTML5, CSS3, and Vanilla JavaScript (ES6+)**.

---

## 🌟 Executive Summary

The **Smart Complaint Management System (SCMS)** is an end-to-end web platform designed to streamline grievance reporting, department allocation, and resolution monitoring. Designed as a production-grade demonstration suitable for academic evaluations, college projects, and portfolio presentations, it provides complete role-based workflows for **Citizens**, **Department Staff**, and **Municipal Administrators** without requiring any database installations or third-party frontend frameworks.

---

## 🚀 Key Features by User Role

### 👥 1. Citizen Portal
- **Public & Authenticated Landing**: Explore municipal services, search issues, and view real-time platform metrics.
- **Complaint Submission**: Guided multi-field form with Title, Detailed Description, Category, Priority (Low to Urgent), Physical Location, and optional Image Attachment (stored client-side as Base64).
- **Automated Tracking ID**: Instant generation of unique grievance tracking codes (e.g., `CMP-1011`).
- **My Complaints Registry**: Search by ID/title, filter by Status, Category, and Priority, sort by submission date, with responsive pagination.
- **Vertical Audit Timeline**: Visual status history showing timestamped progression from *Pending* to *Assigned*, *In Progress*, *Resolved*, and *Closed*.
- **Citizen Controls**: Citizens can edit or cancel/delete their pending complaints before department processing begins.
- **Profile & Password Management**: Manage personal details and simulate password changes.

### 👷 2. Department Staff Portal
- **Staff Operational Dashboard**: Live summary of active workloads, pending reviews, items in progress, and resolution rates.
- **Urgent Priority Alerts**: Banner notifications highlighting critical issues requiring immediate action.
- **Assigned Complaints Queue**: Filter between "Assigned to Me" and "Entire Department". Search by location, category, or title.
- **Interactive Status Progression**: Valid status transitions (*Assigned* ➔ *In Progress* ➔ *Resolved*) with staff remarks and resolution notes.
- **Completed Complaints Archive**: Review of resolved and closed cases with resolution summaries and print-friendly export.
- **Staff Performance Reports**: Live charts depicting departmental category distribution, personal workload status, and one-click browser-generated CSV export.

### 🛡️ 3. Municipal Administrator Command Center
- **Executive KPI Dashboard**: Total complaints, pending triage count, processing rate, active user distribution, and department count.
- **Visual Analytics**: Interactive **Chart.js** charts for department distribution, priority breakdowns, and resolution efficiency.
- **Direct Assignment Queue (`assign-complaints.html`)**: Fast triage queue displaying unassigned complaints, offering one-click departmental dispatch and officer assignment.
- **Global Grievance Registry (`manage-complaints.html`)**: Administrative control over all complaints with search, filter, status overrides, and destructive action safeguards.
- **User & Role Management (`manage-users.html`)**: Add, edit, activate, or deactivate accounts. Includes safeguards preventing accidental removal or deactivation of the last administrator.
- **Municipal Departments (`manage-departments.html`)**: Add/edit municipal departments, track officer counts, view active ticket loads, and validate duplicate department names.
- **Comprehensive Reports & Analytics (`reports.html`)**: Date range filtering (7, 30, 90 days, or All Time), departmental efficiency table, print preview, and full CSV export generated directly in the browser.
- **Demo Data Reset (`settings.html`)**: One-click restore to original seed state with confirmation dialog.

---

## 🔑 Demo Accounts & Credentials

The application comes pre-loaded with demonstration accounts. On the **Login Page**, click any demo account button to auto-fill the credentials:

| Role | Email Address | Password | Department / Scope |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@demo.com` | `demo1234` | System-wide administrative access |
| **Department Staff** | `staff@demo.com` | `demo1234` | Infrastructure Department (`staff_001`) |
| **Department Staff** | `priya.staff@demo.com` | `demo1234` | Infrastructure Department (`staff_002`) |
| **Department Staff** | `arun.staff@demo.com` | `demo1234` | Water Supply Department (`staff_003`) |
| **Department Staff** | `meera.staff@demo.com` | `demo1234` | Electricity Department (`staff_004`) |
| **Department Staff** | `vikram.staff@demo.com` | `demo1234` | Sanitation Department (`staff_005`) |
| **Citizen** | `citizen@demo.com` | `demo1234` | Registered Citizen (`citizen_001`) |
| **Citizen** | `ananya@demo.com` | `demo1234` | Registered Citizen (`citizen_002`) |

> **Note**: Public user registration (`register.html`) is open to any user and automatically provisions a **Citizen** role.

---

## 🛠️ Technology Stack & Architecture

- **Markup**: Semantic **HTML5** with accessibility labels and modern document hierarchy.
- **Styling**: Pure **CSS3** utilizing custom CSS variables (Design System: Deep Navy `#101828`, Primary Blue `#4568F5`, Teal `#16B8A6`), Flexbox, CSS Grid, micro-animations, and responsive breakpoints. No Bootstrap or Tailwind dependencies.
- **Logic**: Modular **Vanilla JavaScript (ES6+)** with cleanly separated concerns:
  - `js/storage.js`: Versioned localStorage schema, pre-seeded datasets, and generic CRUD helpers.
  - `js/auth.js`: Session management, route protection, login/registration validation, and role-based redirects.
  - `js/ui.js`: Reusable UI modules (toast notification engine, confirmation modals, dynamic sidebar/topbar layouts, pagination controls, skeleton loaders, and empty states).
- **Icons**: [Lucide Icons](https://lucide.dev) (CDN).
- **Data Visualization**: [Chart.js v4](https://www.chartjs.org) (CDN).
- **Persistence**: Browser `localStorage` with data versioning key `scms_version`.

---

## 📂 Project Structure

```text
Smart Complaint Management System/
├── index.html                  # Public Landing Page & Live Statistics
├── about.html                  # About Us, Mission & Core Values
├── services.html               # Municipal Services & Categories
├── contact.html                # Contact Information & Inquiry Form
├── login.html                  # Demo Login with One-Click Account Fill
├── register.html               # Citizen Account Registration
│
├── citizen-dashboard.html      # Citizen Home Dashboard & Recent Tickets
├── new-complaint.html          # New Complaint Submission Form
├── my-complaints.html          # Citizen Grievance Registry & Filters
├── complaint-details.html      # Detail View, Timeline & Role Actions
│
├── staff-dashboard.html        # Department Staff Workload Dashboard
├── assigned-complaints.html    # Staff Assigned Queue & Quick Status Update
├── completed-complaints.html   # Resolved/Closed Complaint Archive
├── staff-reports.html          # Staff Performance Analytics & CSV Export
│
├── admin-dashboard.html        # City Administration Command Center
├── manage-complaints.html      # Global Complaints Registry & Allocation
├── assign-complaints.html      # Rapid Triage & Dispatch Queue
├── manage-users.html           # User Directory & Role Administration
├── manage-departments.html     # Department Setup & Staff Allocation
├── reports.html                # Municipal Analytics, Metrics & CSV Export
│
├── profile.html                # Shared User Profile & Password Change
├── settings.html               # System Information & Demo Data Reset
│
├── css/
│   ├── style.css               # Core Design System, Variables & Components
│   └── responsive.css          # Mobile (375px), Tablet (768px), Desktop (1440px)
│
├── js/
│   ├── storage.js              # LocalStorage Schema, Seed Data & CRUD Helpers
│   ├── auth.js                 # Authentication, Sessions & Route Guards
│   └── ui.js                   # Modals, Toasts, Layouts & Helpers
│
└── README.md                   # Comprehensive Project Documentation
```

---

## 💻 How to Run Locally

### Option 1: Direct File Open (Zero Config)
1. Navigate to the project directory.
2. Double-click **`index.html`** to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
3. All styling, icons, and demo datasets will load immediately without requiring any software installation.

### Option 2: Using a Local HTTP Server
If you prefer running via a local development server:
```bash
# Using Node.js npx:
npx serve .

# Or using Python 3:
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🔄 Complaint Lifecycle State Machine

```
[ Citizen Files Complaint ]
           │
           ▼
       (Pending)  ◄── Citizen can edit or delete
           │
           ▼ (Admin assigns department & staff)
       (Assigned)
           │
           ▼ (Staff begins investigation)
     (In Progress)
           │
           ▼ (Staff fixes issue & adds resolution notes)
       (Resolved)
           │
           ▼ (Admin / Verification step)
        (Closed)
```

---

## 🎓 College Viva / Project Demonstration Guide

### Common Evaluator Questions & Answers

1. **Why use `localStorage` instead of an external database like MySQL or MongoDB for this demo?**
   - *Answer*: `localStorage` allows the application to run completely standalone without requiring database installation, connection string configuration, or backend server execution on the examiner's machine. The data layer is decoupled in `storage.js` so that replacing `localStorage.getItem/setItem` with `fetch('/api/...')` REST endpoints transitions the application to a Node.js/SQLite or Express backend effortlessly.

2. **How does Role-Based Access Control (RBAC) work in this implementation?**
   - *Answer*: Every protected page invokes `requireAuth(['role1', 'role2'])` at the beginning of its lifecycle (`auth.js`). If an unauthenticated user visits a protected URL, they are immediately redirected to `login.html`. If an authenticated user visits a page not permitted for their role (e.g., a citizen attempting to view `admin-dashboard.html`), they are redirected to their designated dashboard.

3. **How is data integrity maintained?**
   - *Answer*: Unique IDs are generated for users (`user_...`), complaints (`CMP-10xx`), and history log entries (`h_...`). Status modifications always record a chronological entry in `scms_history` tracking `previousStatus`, `newStatus`, `updatedBy`, `remarks`, and `updatedAt`. Administrative rules also prevent deactivating the last active administrator.

4. **How are reports exported?**
   - *Answer*: Both `staff-reports.html` and `reports.html` implement client-side CSV compilation using the native Blob/URI download pattern (`data:text/csv;charset=utf-8,...`). Reports calculate values dynamically from the current live dataset rather than hardcoded mock figures.

---

## 📄 License
Created for academic demonstration and learning purposes. Open for modification and educational use.
