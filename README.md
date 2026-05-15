# 🤖 AI Resume Generator

A full-stack MERN application that generates tailored resumes and cover letters based on your profile and any job description using AI.

## ✨ Features

- 🔐 User authentication with JWT
- 👤 Profile management (skills, projects, education, certifications)
- 🤖 AI powered resume generation using Groq AI
- 📄 Harvard style ATS friendly resume format
- ✉️ Auto generated cover letter
- 🎯 Job match score out of 100
- ⬇️ Download resume as PDF
- 📱 Responsive UI with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

**AI:**
- Groq AI API (Llama 3.3)

## 📁 Project Structure

```
ai-resume/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   └── resumeController.js
│   ├── middleware/
│   │   └── protect.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   └── resume.js
│   ├── services/
│   │   └── aiService.js
│   └── index.js
├── frontend/
│   └── src/
│       ├── api/
│       │   └── axios.js
│       ├── components/
│       │   └── ResumeDownload.jsx
│       └── pages/
│           ├── Login.jsx
│           ├── Register.jsx
│           ├── Profile.jsx
│           └── Generate.jsx
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- Groq API key (free at console.groq.com)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=mongodb://127.0.0.1:27017/ai-resume
JWT_SECRET=your_secret_key
PORT=5000
AI_API_KEY=your_groq_api_key
```

Run backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/profile | Get user profile |
| PUT | /api/profile/update | Update profile |
| POST | /api/resume/generate | Generate AI resume |

## 💡 How It Works

1. User registers and fills their profile once
2. Paste any job description
3. AI analyzes profile vs job description
4. Generates tailored Harvard style resume
5. Generates professional cover letter
6. Gives match score out of 100
7. Download as PDF

## 🙏 Acknowledgements

- [Groq AI](https://console.groq.com) for free AI API
- [Tailwind CSS](https://tailwindcss.com) for styling
- [MongoDB](https://mongodb.com) for database
