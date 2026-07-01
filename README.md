# 🐾 PawsConnect – Pet Adoption Platform

# 🌐 Live Demo
### 🔗 Visit Now:
👉 https://pawsconnectbyabid.vercel.app

---

## 🛍️ Project Overview

**PawsConnect** is a full-stack pet adoption web application built using the MERN Stack (MongoDB, Express.js, React, Node.js). The platform bridges the gap between animal shelters/owners and compassionate individuals looking to adopt.

The application provides an interactive catalog of pets (dogs, cats, birds, rabbits, etc.), dynamic request tracking, complete CRUD management for pet listings, and dual-layer authorization via secure JSON Web Tokens (JWT).

---

## 🎯 Purpose

The goal of this project is to build a production-ready, full-stack pet adoption interface with rock-solid authentication, secure backend APIs, custom filtering pipelines, and contextual user dashboard workflows.

---

## ✨ Key Features

### 1️⃣ Advanced Search & Dynamic Filtering System (MongoDB Engine)
- Real-Time Text Search: Implements the MongoDB $regex operator to allow users to search for pets by name with flexible, partial-match queries.

- Species Categorization: Utilizes the high-performance MongoDB $in operator on the backend, enabling seamless filtering across multiple distinct animal categories (Dogs, Cats, Birds, etc.) simultaneously.

---

### 2️⃣ Dual-Layer Security & State Persistence (JWT & Route Protection)
- Secure Tokenization: Generates JSON Web Tokens (JWT) upon authentication, securely storing them in HTTPOnly cookies and verifying access via custom server-side middleware to protect private routes.

- Hard-Reload Protection: Implements robust session persistence logic ensuring that authenticated users navigating private dashboards do not get forcefully redirected to the login page when refreshing or reloading the browser.
---

### 3️⃣ Role-Based Dashboard CRUD & Smart Adoption Business Logic
- Context-Aware Workspaces: Features segregated dashboard flows where adopters track their active requests, while pet owners/shelters fully manage their listings (Create, Read, Update, Delete) and process incoming adoption bids.

- Automated Guardrails: Enforces critical business rules preventing owners from submitting requests on their own listings. Once an owner clicks Approved on a specific request, the backend automatically updates the pet's status to Adopted and locks out all competing pending applications.

---

## 📱 Fully Responsive Design
- Mobile 📱
- Tablet 📟
- Desktop 💻

---



## 📁 Project File Structure

```
pet-adoption-platform/
├── public/
│   ├── Assets/
│   │   ├── heroimg.png
│   │   └── Process.png
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── all-pets/
│   │   │   ├── page.jsx
│   │   │   └── [id]/
│   │   │       └── page.jsx
│   │   ├── dashboard/
│   │   │   ├── layout.jsx
│   │   │   ├── page.jsx
│   │   │   ├── add-pet/
│   │   │   │   └── page.jsx
│   │   │   ├── my-listing/
│   │   │   │   └── page.jsx
│   │   │   └── my-requests/
│   │   │       └── page.jsx
│   │   ├── log-in/
│   │   │   └── page.jsx
│   │   ├── sign-up/
│   │   │   └── page.jsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── not-found.jsx
│   ├── Components/
│   │   ├── Connect.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── HomePets.jsx
│   │   ├── Navbar.jsx
│   │   ├── PetCare.jsx
│   │   ├── Process.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Review.jsx
│   │   ├── SkeletonLoader.jsx
│   │   └── WhyAdopt.jsx
│   └── lib/
│       ├── auth-client.js
│       ├── data.js
│       └── proxy.js
├── .env
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md
```

---


# Tech Stack
- ## 💻 Frontend (Client-Side)
 - - ⚛️ Next.js (App Router) – React Framework for Routing and Server-Side Rendering

- - 🎨 Tailwind CSS – Utility-First CSS Framework

- - 🧩 DaisyUI – Tailwind CSS Component Library

- - 🔔 React Toastify – Interactive UI Notifications

- - 🎨 Animate.css – Smooth CSS Animations

- ## 🖥️ Backend & Database (Server-Side)
- - 🟢 Node.js – JavaScript Runtime Environment

- - 🚂 Express.js – Minimalist Web Framework for Building RESTful APIs

- - 🍃 MongoDB – NoSQL Document-Based Database

- - 🔐 JSON Web Tokens (JWT) – Secure Stateless Authentication Mechanism



---
# 👨‍💻 Author

**Abid Hossain Sifat**  
SunCart Assignment Project  
Built with ❤️ using Next.js
