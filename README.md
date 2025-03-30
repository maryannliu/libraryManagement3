# **Assignment: Full-Stack CRUD Application Development with DevOps Practices**

# 📚 Library Management System

A full-stack CRUD application built with Node.js, Express, MongoDB, and React for managing books, members, and loans in a library. Includes user authentication and a CI/CD pipeline for deployment.

---

## 📝 Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [CI/CD Pipeline](#cicd-pipeline)
- [References](#references)

---

## 🚀 Features

- User authentication with JWT
- CRUD operations for:
  - Books
  - Members
  - Loans
- Mongoose schemas with validations
- CI/CD using GitHub Actions
- Deployed backend and frontend to AWS EC2

---

## 🧰 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/maryannliu/libraryManagement3.git
cd libraryManagement3
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env  
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

---

## 📚 References

OpenAI. (2025). *Debugging assistance for Library Management System backend and test cases* [Large language model]. ChatGPT. https://chat.openai.com/

Software Freedom Conservancy. (n.d.). *Git documentation*. Git. https://git-scm.com/docs

Amazon Web Services. (n.d.). *Amazon EC2 documentation*. https://docs.aws.amazon.com/ec2/?icmpid=docs_homepage_featuredsvcs
