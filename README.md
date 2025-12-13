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
- **User Authentication** with JWT + bcrypt
- **Video Uploads**:  
  - Files first stored locally (video + thumbnail)  
  - Uploaded to **Cloudinary**  
  - Local files auto-deleted after upload  
  - Real-time upload progress tracked via **Socket.io**
- **Video Streaming** from Cloudinary
- **Comment System** with pagination
- **MongoDB** for scalable data storage

---



## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file uploads)
- Cloudinary (video storage)
- Socket.io (upload progress)
- JWT + bcrypt (auth)

---


## ⚙️ Installation & Setup
```bash
# 1. Clone the repository
git clone (https://github.com/Sarvesh7617/Video-Tube-Frontend.git)
```

```bash
# 2. Navigate to project directory
cd navigate_to_dir
```

```bash
# Install dependencies
npm install
```

```bash
# 3. 🔐 Environment Variables

Create a .env file in the root of your project and add your Appwrite credentials:

VITE_BACKEND_URL="http://your_backend_localhost/api/v1"
BACKEND_URL="http://your_backend_localhost"
```

```bash
# Run development server
npm run dev
```


