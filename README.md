# **Assignment: Full-Stack CRUD Application Development with DevOps Practices**

# 📚 Library Management System

A full-stack CRUD application built with Node.js, Express, MongoDB, and React for managing books, members, and loans in a library. Includes user authentication and a CI/CD pipeline for deployment.

---

## 📝 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [CI/CD Pipeline](#cicd-pipeline)
- [JIRA Board](#jira-board)
- [License](#license)
- [References](#references)

---

## 🚀 Features

- User authentication with JWT
- CRUD operations for:
  - 📖 Books
  - 👥 Members
  - 🔁 Loans
- Role-based access control
- Mongoose schemas with validations
- RESTful API using Express
- CI/CD using GitHub Actions
- Deployed backend and frontend to AWS EC2

---

## 🛠️ Tech Stack

**Frontend:** React.js  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Auth:** JWT  
**Deployment:** GitHub Actions, AWS EC2  
**Version Control:** Git + GitHub

---

## 🧰 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/library-management-system.git
cd library-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Add your MongoDB URI and JWT_SECRET
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## ✅ Usage

- Register/login as a user
- Add, update, or delete books, members, and loans
- View active loans and return books
- Authentication required for all protected routes

---

## 📂 Project Structure

```
/backend
  /controllers
  /models
  /routes
  server.js
/frontend
  /components
  /pages
  App.js
README.md
```

---

## ⚙️ CI/CD Pipeline

- GitHub Actions configured to:
  - Run backend tests
  - Build and deploy backend and frontend to AWS EC2
- See `.github/workflows/` for full pipeline configs

---

## 📝 License

This project is licensed under the MIT License.

---

## 📚 References

OpenAI. (2025). *Debugging assistance for Library Management System backend and test cases* [Large language model]. ChatGPT. https://chat.openai.com/

Software Freedom Conservancy. (n.d.). *Git documentation*. Git. https://git-scm.com/docs

Amazon Web Services. (n.d.). *Amazon EC2 documentation*. https://docs.aws.amazon.com/ec2/?icmpid=docs_homepage_featuredsvcs
