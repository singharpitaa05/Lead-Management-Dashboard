# Lead Management Dashboard - Professional Lead Management Platform

A comprehensive lead management application built with modern web technologies, designed to help users efficiently organize, track, and manage their sales leads with advanced features like real-time analytics, lead scoring, and performance tracking.

 [Quick Start](#installation) | 🎯 [Features](#-features) | 💻 [Tech Stack](#-tech-stack)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-black?logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.x-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [How to Contribute](#how-to-contribute)
- [Author](#-author)
- [License](#-license)

## 🌟 Overview

Lead Management Dashboard is a feature-rich lead management platform that empowers sales teams to manage their workflow effectively. The application combines a clean, intuitive user interface with robust backend infrastructure to provide a seamless lead management experience. Users can create, organize, filter, search, and analyze their leads with ease, while administrators have full control over the platform.

### 🎯 Key Features

- **Lead CRUD Operations** - Create, read, update, and delete leads effortlessly
- **Advanced Filtering** - Filter leads by status, source, and priority levels
- **Real-time Search** - Search leads with instant results and highlighting
- **Bulk Operations** - Select multiple leads and perform batch actions
- **Lead Analytics** - View real-time analytics dashboard with performance tracking

## ✨ Features

### 📋 Lead Management

**Create & Organize Leads**
- Add new leads with a simple, intuitive input form
- Organize leads with custom details and descriptions
- Track lead creation and modification timestamps
- Immediate feedback on lead addition with success notifications

**Status Tracking**
- Track lead progress with multiple status states: **New**, **Qualified**, **Contacted**, **Converted**
- Toggle lead status with a single click using status controls
- Visual status badges to quickly identify lead states
- Automatic status updates reflected in analytics

**Lead Filtering**
- Filter leads by status: All, New, Qualified, Contacted, or Converted leads
- Filter by source: Website, Email, Social Media, Referral
- Filter by priority: High, Medium, Low priority levels
- Active filter indicator showing current filter state
- Smooth transitions when switching between filter views

### 🔍 Search & Organization

**Real-time Search**
- Instant search filtering as you type lead names
- Search term highlighting in results for better visibility
- Search result counter showing matches
- Quick clear button to reset search state
- Keyboard shortcut (Ctrl+S or /) to focus search bar

**Sorting Options**
- **Newest First** - Sort by creation date (newest to oldest)
- **Oldest First** - Sort by creation date (oldest to newest)
- **A to Z** - Alphabetical ascending order
- **Z to A** - Alphabetical descending order
- **High Priority First** - Group high priority leads at top
- **Recently Updated** - Sort by last modification date

### 📊 Analytics Dashboard

**Real-time Analytics**
- **Total Leads** - Count of all leads in the system
- **New Leads** - Count of newly added leads
- **Converted Leads** - Count of successfully converted leads
- **Conversion Rate** - Percentage calculated as (Converted / Total) × 100

**Performance Visualization**
- Animated charts showing lead distribution by source
- Status breakdown with visual indicators
- Trend analysis showing lead growth over time
- Color-coded analytics based on performance metrics
- Real-time updates reflecting lead changes

### ✅ Bulk Operations

**Multiple Lead Selection**
- Individual lead checkboxes for selective operations
- "Select All" checkbox to quickly select all visible leads
- Visual highlight for selected leads
- Selection counter showing number of selected items

**Batch Actions**
- **Update Status** - Change status of multiple leads at once
- **Assign to Team Member** - Bulk assign leads to sales staff
- **Delete Multiple** - Remove multiple leads simultaneously

### 🎨 User Interface

**Responsive Design**
- Mobile-first responsive layout
- Optimized for mobile, tablet, and desktop views
- Touch-friendly button sizes and spacing
- Adaptive grid layouts for different screen sizes

**Visual Feedback**
- Loading spinners during data operations
- Toast notifications for user actions (success, error, warning)
- Animated transitions between states
- Empty state message when no leads exist

## ⚙️ Tech Stack

### Frontend Architecture

**React 19.x** 🛠️
- Modern JavaScript library for building user interfaces
- Component-based architecture for reusable UI elements
- Functional components with hooks for state management
- Efficient re-rendering through React's virtual DOM

**Vite** ⚙️
- Lightning-fast build tool and development server
- Native ES modules support for instant HMR (Hot Module Replacement)
- Optimized production builds with code splitting
- Minimal configuration required for quick setup

**Vanilla JavaScript Modules**
- Modular utility files for specific functionality
- `api.js` - Axios HTTP client configuration and API calls
- `authService.js` - Authentication service with JWT
- `leadService.js` - Lead CRUD operations
- `analyticsService.js` - Analytics data fetching
- `validator.js` - Input validation and lead verification
- `search.js` - Search functionality and term highlighting
- `sort.js` - Lead sorting logic for multiple sort options
- `stats.js` - Analytics calculation and formatting

**Tailwind CSS v4** 🎨
- Utility-first CSS framework for rapid UI development
- Pre-configured color palette and responsive breakpoints
- Custom animations and transitions
- Built-in dark mode support (optional implementation)

**Axios** 🌐
- Promise-based HTTP client for API communication
- Automatic request/response interceptors
- Error handling and timeout management
- Request cancellation support

### Backend Architecture

**Node.js 18+** 🟢
- JavaScript runtime for server-side development
- Event-driven, non-blocking I/O model
- NPM ecosystem for package management
- Full compatibility with modern JavaScript features

**Express.js 5.x** 🚀
- Lightweight web application framework
- Middleware support for request processing
- Routing system for API endpoints
- Error handling and middleware chain management

**MongoDB + Mongoose** 🗄️
- MongoDB Atlas cloud database for data persistence
- Mongoose ODM for schema validation and data modeling
- Flexible schema design for lead documents
- Automatic indexing for optimized queries
- Transaction support for data integrity

**Express Validator** 🔍
- Input validation and sanitization
- Custom validation rules for lead data
- Error message formatting
- Middleware integration for route protection

**JWT Authentication** 🔐
- JSON Web Token for secure authentication
- Token-based user sessions
- Protected API routes
- Refresh token support for extended sessions

**CORS** 🔐
- Cross-Origin Resource Sharing configuration
- Secure API access from different domains
- Configuration for production and development environments
- Request method and header restrictions

### Development Tools

**Version Control** 🧑‍💻
- Git for distributed version control
- GitHub for repository hosting and collaboration
- Branch management for feature development
- Commit history for tracking changes

**Environment Management**
- `.env` file for sensitive configuration
- Environment variables for API keys and database URLs
- Separate development and production configurations
- Safe credential management without exposing secrets

## 📁 Project Structure

```
Lead-Management-Dashboard/
├── backend/
│   ├── config/
│   │   └── db.js                         # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js             # Authentication logic
│   │   ├── leadController.js             # Lead CRUD operations
│   │   └── analyticsController.js        # Analytics logic
│   ├── models/
│   │   ├── User.js                       # User schema definition
│   │   └── Lead.js                       # Lead schema definition
│   ├── routes/
│   │   ├── authRoutes.js                 # Authentication routes
│   │   ├── leadRoutes.js                 # Lead API routes
│   │   └── analyticsRoutes.js            # Analytics API routes
│   ├── middleware/
│   │   └── authMiddleware.js             # JWT authentication middleware
│   ├── utils/
│   │   └── jwt.js                        # JWT utilities
│   ├── .env                              # Environment variables
│   ├── server.js                         # Express server entry point
│   └── package.json                      # Backend dependencies
│
├── frontend/
│   ├── public/                           # Static assets
│   ├── src/
│   │   ├── index.css                     # Tailwind CSS imports
│   │   ├── main.jsx                      # React entry point
│   │   ├── App.jsx                       # Root React component
│   │   ├── components/
│   │   │   ├── Navbar.jsx                # Navigation component
│   │   │   ├── CreateLeadModal.jsx       # Lead creation modal
│   │   │   └── charts/
│   │   │       ├── SourceChart.jsx       # Lead source visualization
│   │   │       ├── StatusChart.jsx       # Lead status visualization
│   │   │       └── TrendChart.jsx        # Lead trend visualization
│   │   ├── pages/
│   │   │   ├── Login.jsx                 # Login page
│   │   │   ├── Register.jsx              # Registration page
│   │   │   ├── Dashboard.jsx             # Main dashboard page
│   │   │   ├── Leads.jsx                 # Leads list page
│   │   │   └── LeadDetails.jsx           # Individual lead details
│   │   ├── services/
│   │   │   ├── authService.js            # Authentication API calls
│   │   │   ├── leadService.js            # Lead API calls
│   │   │   └── analyticsService.js       # Analytics API calls
│   │   └── utils/
│   │       └── api.js                    # Axios configuration
│   ├── .env                              # Environment variables
│   ├── eslint.config.js                  # ESLint configuration
│   ├── vite.config.js                    # Vite configuration
│   ├── index.html                        # HTML template
│   ├── package.json                      # Frontend dependencies
│   └── .env                              # Frontend environment variables
│
├── .gitignore                            # Git ignore rules
├── README.md                             # Project documentation
└── LICENSE                               # MIT license file
```

## 🚀 Installation

### Prerequisites

- **Node.js** 18+ (Download from [nodejs.org](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **MongoDB Account** (Create free account at [MongoDB Atlas](https://www.mongodb.com/))
- **Git** (Download from [git-scm.com](https://git-scm.com/))

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/Lead-Management-Dashboard.git

# Navigate to project directory
cd Lead-Management-Dashboard
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

**Create `.env` file in backend directory:**

```env
# Server Configuration
NODE_ENV=
PORT=

# Database Configuration
MONGODB_URI=

# JWT Configuration
JWT_SECRET=
JWT_EXPIRE=

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

**Start backend server:**

```bash
npm run dev
```

Backend server runs on: `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

**Create `.env` file in frontend directory:**

```env
VITE_API_URL=
VITE_SOCKET_URL=
```

**Start frontend development server:**

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Step 4: Access Application

Open your browser and navigate to:
```
http://localhost:5173
```

The application should load with the full lead management interface ready to use.

## 🎮 Usage

### For Users

**Getting Started**
1. **Register Account** - Create your account using email and password
2. **Login** - Access your account with your credentials
3. **View Dashboard** - Explore analytics and lead overview
4. **Create Lead** - Click "Add Lead" button to create a new lead
5. **Manage Leads** - View, edit, delete, and update lead information

**Lead Management Features**
1. **Filter Leads** - Click filter buttons to show leads by status, source, or priority
2. **Search Leads** - Use search bar to find leads by name or company (Ctrl+S or /)
3. **Sort Leads** - Select sort option to organize by date, name, or priority

**Analytics & Reporting**
1. **View Analytics** - Dashboard shows lead source distribution and status breakdown
2. **Track Metrics** - Monitor total leads, conversion rate, and growth trends
3. **Performance Dashboard** - Review key performance indicators and trends

**Productivity Tips**
- Use keyboard shortcuts for faster navigation (see Keyboard Shortcuts section)
- Leverage bulk operations for quick lead management
- Regularly export leads for backup purposes
- Monitor conversion rate and lead source effectiveness
- Keep lead status updated for accurate reporting

### For Developers

**API Integration**
- Backend API runs on port 5000
- RESTful endpoints for lead CRUD operations
- JWT authentication for protected routes
- Axios configured for automatic error handling

**Available Endpoints**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `GET /api/leads/:id` - Get lead details
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead
- `GET /api/analytics` - Get analytics data


## How to Contribute

We welcome contributions to improve Lead Management Dashboard! Here's how to contribute:

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork locally
git clone https://github.com/your-username/Lead-Management-Dashboard.git
cd Lead-Management-Dashboard

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# Edit files as needed for your feature

# 5. Commit your changes
git commit -m "Add amazing feature: brief description"

# 6. Push to your branch
git push origin feature/amazing-feature

# 7. Open a Pull Request on GitHub
# Provide clear description of changes and improvements
```

### Contribution Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes before submitting
- Update documentation for new features
- Ensure no sensitive information in commits

## 👤 Author

**Designed and Developed with 💖 by Arpita Singh**

### 🔗 Connect with us:

- **📧 Email** - [singharpita.05march@gmail.com]
- **💼 LinkedIn** - [https://www.linkedin.com/in/singharpitaa05]
- **🐙 GitHub** - [https://github.com/singharpitaa05]

📬 Feel free to reach out for questions, suggestions, or collaboration opportunities!

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.