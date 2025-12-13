# VideoTube Frontend 🎬

A modern frontend for the VideoTube platform, inspired by YouTube.  
Built with **React, Redux Toolkit, TailwindCSS, Vite**, and integrated with backend APIs.

---

<img width="1919" height="953" alt="Screenshot 2025-12-13 130303" src="https://github.com/user-attachments/assets/25b544b9-61cf-46a4-b253-6244de341b15" />


---

<img width="1912" height="958" alt="Screenshot 2025-12-14 003444" src="https://github.com/user-attachments/assets/09bbeb02-12b2-4d51-9b6f-6b4eaafe32bf" />


---


<img width="1919" height="965" alt="Screenshot 2025-12-14 003556" src="https://github.com/user-attachments/assets/d11c353f-2a0c-4190-bc4d-1a45f7006c3c" />


---



## 🚀 Features
- Responsive UI with **React + TailwindCSS**
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Infinite Scroll** for videos and comments (10 items per batch)
- **Axios** for API communication
- **React Toastify** for notifications
- Real-time upload progress updates via **Socket.io client**
---



## 🛠️ Tech Stack
- React 19.2
- Redux Toolkit
- TailwindCSS
- Vite v7.2.7
- Axios
- Socket.io Client
---


## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone (https://github.com/Sarvesh7617/Video-Tube-Frontend.git)
```

### 2. Navigate to project directory
```bash
cd navigate_to_dir
```

### 3. Install dependencies
```bash
npm install
```

### 4. 🔐 Environment Variables

#### Create a .env file in the root of your project and add your Appwrite credentials:
```bash
VITE_BACKEND_URL="http://your_backend_localhost/api/v1"
BACKEND_URL="http://your_backend_localhost"
```

### 5. Run development server
```bash
npm run dev
```


## 📂 Project Structure
```bash
videoTube_Frontend                 
├── public/                        # Publicly served static files
│   └── favicon.ico                # Browser tab icon
│
├── src/                           # Main source code
│   ├── assets/                    # logo image
│   │   └── logo.webp
│   │
│   ├── components/                # Reusable UI components
│   │   ├── channel/               # Channel‑related UI components
│   │   │   ├── ChannelHeader
│   │   │   └── ChannelNavigate
│   │   ├── container/             # Layout container components
│   │   │   └── Container
│   │   ├── dashboard/             # Admin dashboard components
│   │   │   ├── StateSection
│   │   │   └── VideoTable
│   │   ├── header/                # Header + navigation components
│   │   │   ├── Header
│   │   │   ├── Navbar
│   │   │   ├── Search
│   │   │   └── Sidebar
│   │
│   ├── config/                    # App configuration files
│   │   └── config
│   │
│   ├── helpers/                   # Utility/helper functions
│   │   ├── axiosHelper            # Axios wrapper for API calls
│   │   └── timeAgo                # Time formatting helper
│   │
│   ├── pages/                     # All application pages
│   │   ├── channel/               # Channel‑related pages
│   │   │   ├── AdminDashboard
│   │   │   ├── EditChannel
│   │   │   ├── HomePage
│   │   │   ├── LikedVideos
│   │   │   ├── MySubscription
│   │   │   ├── SearchVideo
│   │   │   ├── TermandCondition
│   │   │   ├── VideoDetail
│   │   │   └── WatchDetail
│   │   └── index.js               # Page export file
│   │
│   ├── skeleton/                  # Skeleton loaders for UI
│   │   ├── HomeSkeleton
│   │   └── LoadingSkeleton
│   │
│   ├── store/                     # Redux store & slices
│   │   ├── Slice/                 # All Redux slices
│   │   │   ├── authSlice
│   │   │   ├── commentSlice
│   │   │   ├── dashboardSlice
│   │   │   ├── likesSlice
│   │   │   ├── subscriptionSlice
│   │   │   ├── tweetSlice
│   │   │   ├── userSlice
│   │   │   └── videoSlice
│   │   └── store                  # Redux store configuration
│   │
│   ├── App.jsx                    # Root React component
│   ├── App.css                    # Global app styles
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global CSS
│
├── .env                           # Environment variables
├── .gitignore                     # Git ignore rules
├── index.html                     # Main HTML template
├── eslint.config.js               # ESLint configuration
├── package.json                   # Dependencies & scripts
├── package-lock.json              # Dependency lock file
├── vite.config.js                 # Vite bundler config
└── vercel.json                    # Vercel deployment config
```
