# MySchool – High School Official Website

A full‑stack school management web app built with **Next.js 14**, **React.js**, **Node.js/Express**, **MongoDB**, **Bootstrap**, and **Axios**.

[🟢 **Live Demo**](https://my-school-3lk2.onrender.com/)

---

## ✨ Highlights

* **Server Power:** Next.js 14 powers both **frontend & backend** for fast, scalable, SEO‑friendly pages.
* **UI Craftsmanship:** React + Bootstrap for a **responsive**, **accessible**, and **modern** interface.
* **Request Maestro:** Axios handles **HTTP requests** and smooth **async** data flows.
* **Data Hub:** MongoDB for **flexible**, **scalable** storage.
* **Hard Authentication:** Role‑based access (Admin, Teacher, Student, User) with protected routes and different UIs.
* **CRUD Everywhere:** Create/Read/Update/Delete for **Students**, **Teachers**, **Notice Board**, and more.
* **Reports:** Generate & send **Report Cards** for every student.

---

## 🧭 Table of Contents

* [Architecture](#architecture)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Screenshots](#screenshots)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Local Setup](#local-setup)
  * [Environment Variables](#environment-variables)
  * [Available Scripts](#available-scripts)
* [Database (MongoDB Atlas)](#database-mongodb-atlas)
* [Project Structure](#project-structure)
* [API Overview](#api-overview)
* [Roles & Access Control](#roles--access-control)
* [Deployment (Render)](#deployment-render)
* [Security Notes](#security-notes)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)

---

## 🏗️ Architecture

* **Next.js 14 App Router** for pages, layouts, and server components.
* **API layer** using Next.js Route Handlers or Express (depending on your setup) to perform CRUD & auth.
* **MongoDB (Mongoose)** for data modeling.
* **Axios** for client→API calls.
* **Role‑based guards** at both **UI** and **API** levels.

> You can run the app as a single Next.js project (with built‑in API routes) or as a hybrid where Express runs separately and Next.js proxies API calls.

---

## 🧰 Tech Stack

**Frontend:** Next.js 14, React.js, Bootstrap, Axios
**Backend:** Next.js Route Handlers or Node.js + Express
**Database:** MongoDB (Atlas) with Mongoose
**Other:** dotenv, morgan, cors, slugify, node‑cron, etc.

---

## ✅ Features

* Authentication with roles: **Admin / Teacher / Student / User**
* Profile dashboards per role
* CRUD:

  * **Students** (admissions, profiles, classes)
  * **Teachers** (profiles, subjects, schedules)
  * **Notice Board** (create, publish, archive)
* Report Cards (create, send)
* Search, filter, pagination
* Responsive design (mobile‑first)
* Logging & error handling

---

## 🖼️ Screenshots

> Add your screenshots to `/public/screens` and link them here.

* **Landing Page**
  `public/screens/landing.png`
* **Admin Dashboard**
  `public/screens/admin-dashboard.png`
* **Teacher Panel**
  `public/screens/teacher-panel.png`
* **Student Portal**
  `public/screens/student-portal.png`

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* MongoDB Atlas cluster & Database User

### Local Setup

```bash
# 1) Clone
git clone <your-repo-url>
cd myschool

# 2) Install deps
npm install

# 3) Create .env.local (see below)

# 4) Run dev
npm run dev

# 5) Open
http://localhost:3000
```

### Environment Variables

Create **`.env.local`** in the project root:

```bash
# MongoDB
MONGO_URI="mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.d3clh8u.mongodb.net/myschool?retryWrites=true&w=majority&appName=Cluster0"

# Auth (examples)
JWT_SECRET="super_long_random_secret"
TOKEN_EXPIRES_IN="7d"

# App
NODE_ENV="development"
NEXT_PUBLIC_APP_NAME="MySchool"
```

> If your MongoDB password contains special characters (e.g., `@ # !`), **URL‑encode** them in `MONGO_URI`.

### Available Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint"
  }
}
```

If you’re using a **separate Express server**, you might prefer:

```json
{
  "scripts": {
    "server": "nodemon server.js",
    "client": "next dev",
    "dev": "concurrently npm:server npm:client",
    "build": "next build",
    "start": "next start -p 3000"
  }
}
```

---

## 🍃 Database (MongoDB Atlas)

1. Resume/start your cluster in Atlas.
2. Create a **Database User** (Database Access) with username/password.
3. Network Access → Add IP `0.0.0.0/0` (or your IP for better security).
4. Use a connection string with your DB name:
   `...mongodb.net/myschool?retryWrites=true&w=majority&appName=Cluster0`
5. On first write, MongoDB auto‑creates the `myschool` database.

---

## 🗂️ Project Structure

```
myschool/
├─ app/                     # Next.js (app router)
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ (dashboard)/
│  └─ api/                  # Route Handlers (REST)
│     ├─ auth/
│     ├─ students/
│     ├─ teachers/
│     └─ notices/
├─ lib/
│  ├─ db.ts                 # Mongoose connection
│  └─ auth.ts               # auth helpers, role guards
├─ models/
│  ├─ Student.ts
│  ├─ Teacher.ts
│  └─ Notice.ts
├─ components/
├─ public/
│  └─ screens/              # screenshots for README
├─ .env.local
├─ package.json
└─ README.md
```

---

## 🔌 API Overview

> Example using Next.js Route Handlers; adjust if you run Express separately.

### Auth

* `POST /api/auth/login` – login, returns token/session
* `POST /api/auth/register` – (admin/secure) create users

### Students

* `GET /api/students` – list (supports `page`, `q`)
* `POST /api/students` – create (admin)
* `GET /api/students/:id` – detail
* `PATCH /api/students/:id` – update (admin)
* `DELETE /api/students/:id` – delete (admin)

### Teachers

* `GET /api/teachers`
* `POST /api/teachers` (admin)
* `GET /api/teachers/:id`
* `PATCH /api/teachers/:id` (admin)
* `DELETE /api/teachers/:id` (admin)

### Notices

* `GET /api/notices` – public/role‑based visibility
* `POST /api/notices` – create (admin/teacher)
* `PATCH /api/notices/:id` – update
* `DELETE /api/notices/:id` – delete

### Example Axios Call

```ts
import axios from "axios";

export async function fetchStudents(page = 1) {
  const { data } = await axios.get(`/api/students?page=${page}`);
  return data;
}
```

---

## 🔐 Roles & Access Control

* **Admin:** full access to users, students, teachers, notices, reports
* **Teacher:** manage assigned classes, post notices, update marks
* **Student:** view timetable, report cards, notices
* **User/Guest:** public pages only

**Guards:**

* Server: check role before performing actions
* Client: hide/disable UI for unauthorized roles + redirect

---

## ☁️ Deployment (Render)

* Push to GitHub.
* Create a **Render Web Service** → connect repo.
* **Build Command:** `npm install && npm run build`
* **Start Command:** `npm run start`
* Add environment variables from `.env.local` into Render **Environment** tab.
* Ensure **MongoDB connection** allows Render’s IP (or `0.0.0.0/0`).

If using separate Express API, deploy two services (Client & API) and configure env `NEXT_PUBLIC_API_BASE_URL` accordingly.

---

## 🛡️ Security Notes

* Never commit `.env*` files.
* Use strong, unique DB passwords (URL‑encode special characters).
* Limit Network Access in Atlas to known IPs in production.
* Validate all inputs (server‑side) with a schema validator.
* Use HTTPS in production.

---

## 🗺️ Roadmap

* Attendance module
* Timetable & Exams management
* Fees & invoices
* Parent portal
* Push/email notifications
* Role management UI

---

## 🤝 Contributing

PRs are welcome! Please open an issue to discuss major changes.

---

## 📝 License

MIT © Ismail Abbasi
