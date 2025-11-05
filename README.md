# 🚀 Full-Stack Portfolio & Career Management App

CareerHub is a **secure, multilingual full-stack portfolio application** built with:

- **Frontend:** Next.js 14 (React + TypeScript + TailwindCSS + i18next)
- **Backend:** ASP.NET Core Web API (.NET 9, C#)
- **Database:** PostgreSQL (EF Core)
- **Auth:** JWT with Refresh Tokens in HttpOnly Cookies + CSRF Protection

---

## 🧭 Project Overview

CareerHub lets you create and manage your professional portfolio and CV online:

- **Profile photo & position**
- **Experiences**, **education**, **skills**, **certifications**, and **languages**
- **Dynamic language switching (EN ↔ DE)**
- **Metrics dashboard**
- Secure **authentication with refresh tokens**
- Fully responsive, SSR-optimized UI

---

## ⚙️ Features

✅ Next.js 14 App Router + TypeScript
✅ i18next for static & dynamic translations
✅ JWT + Refresh Token Authentication
✅ HttpOnly Cookies + CSRF Protection
✅ EF Core (PostgreSQL) ORM
✅ Swagger API documentation
✅ CORS configured for secure frontend communication
✅ Clean modular architecture

---

## 🏗 Architecture

```
CareerHub/
 ├── backend/                # ASP.NET Core backend
 │   ├── Controllers/              # API endpoints
 │   ├── Models/                   # EF entities (User, Profile, etc.)
 │   ├── Data/                     # AppDbContext + migrations
 │   ├── appsettings.json          # Configuration
 │   └── Program.cs                # Entry point
 │
 └── frontend/                     # Next.js 14 (TypeScript) frontend
     ├── app/                      # App Router pages (SSR & client)
     ├── components/               # UI components
     ├── context/                  # React contexts (Auth, Theme, etc.)
     ├── services/                 # API calls → ASP.NET Core
     ├── i18n/                     # Translation config + JSON files
     ├── public/                   # Static assets and images
     ├── .env                      # NEXT_PUBLIC_API_BASE_URL setting
     └── next.config.mjs           # Next.js configuration
```

## 💻 Frontend Setup (Next.js)

### 1️⃣ Environment variables

Create `frontend/.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://localhost:7119/api
```

### 2️⃣ Install & Run

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **[http://localhost:3000](http://localhost:3000)**

---

## 🌍 Internationalization (i18n)

Implemented via [i18next](https://www.i18next.com/) + `react-i18next`.

- Translation files stored in `frontend/i18n/locales/{en,de}/translation.json`
- Language switch via country flag buttons (🇬🇧 → EN, 🇩🇪 → DE)
- SSR-safe initialization in `frontend/i18n/index.ts`
- Dynamic translations for API data coming soon (backend multi-language fields)

---

## 🔐 Authentication & Security

### Overview

- **Access Token (JWT)** – short-lived, HttpOnly cookie
- **Refresh Token** – long-lived, HttpOnly cookie
- **Token rotation** – each refresh invalidates previous token

### Flow

1️⃣ **Login:**
`/api/auth/login` → sets secure cookies
2️⃣ **Authenticated requests:**
Cookies sent automatically
3️⃣ **Auto-refresh:**
`/api/auth/refresh` renews tokens
4️⃣ **Logout:**
`/api/auth/logout` clears cookies

---

## 🛡 CSRF Protection

Implements the **Double-Submit Cookie** pattern:

- Backend issues `CSRF-TOKEN` cookie
- Frontend sends `X-CSRF-TOKEN` header
- Backend verifies match before state-changing requests

---

## 🔒 Environment Variables

| Key                                   | Description                     |
| ------------------------------------- | ------------------------------- |
| `Jwt:Key`                             | Strong 256-bit secret           |
| `Jwt:Issuer`                          | Token issuer URL                |
| `Jwt:Audience`                        | Token audience URL              |
| `ConnectionStrings:DefaultConnection` | PostgreSQL string               |
| `ASPNETCORE_ENVIRONMENT`              | `Development` or `Production`   |
| `NEXT_PUBLIC_API_BASE_URL`            | Base URL for frontend API calls |

---

## 💡 Best Practices

✅ Short-lived JWT + rotating refresh tokens
✅ Hash refresh tokens in DB
✅ `HttpOnly + Secure` cookies (no localStorage)
✅ CSRF protection for mutations
✅ Strong password hashing (BCrypt)
✅ HTTPS enforced
✅ Strict CORS origins
✅ EF Core migrations tracked
✅ Graceful 401 handling in frontend

---

## 🚀 Deployment Notes

**Frontend (Next.js):**

- Deploy via Vercel, Netlify, or Nginx + TLS
- Set `NEXT_PUBLIC_API_BASE_URL` to backend URL
- Use HTTPS always

**Backend (.NET API):**

- Serve behind HTTPS reverse proxy
- Enable HSTS and CORS
- Rotate `Jwt:Key` periodically
- Use 32+ byte signing key

---

## 📜 License

MIT License © 2025 Marek Orihel
All rights reserved.
