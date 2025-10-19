# 🚀 CareerHub – Full-Stack Portfolio & Career Management App

CareerHub is a **secure full-stack portfolio application** built with:

- **Frontend:** React + TypeScript + Tailwind
- **Backend:** ASP.NET Core Web API (.NET 8, C#)
- **Database:** PostgreSQL (EF Core)
- **Auth:** JWT with Refresh Tokens in HttpOnly Cookies + CSRF Protection

---

## 🧩 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Authentication & Security](#authentication--security)
- [Environment Variables](#environment-variables)
- [Best Practices](#best-practices)
- [Deployment Notes](#deployment-notes)
- [License](#license)

---

## 🧭 Project Overview

CareerHub lets you create and manage your professional profile, including:

- **Profile photo & position**
- **Experience**, **skills**, **certifications**, **education**, and **languages**
- **Metrics dashboard**
- Secure **authentication with refresh tokens**
- Fully responsive React UI

---

## ⚙️ Features

✅ JWT + Refresh Token Authentication  
✅ HttpOnly Secure Cookies  
✅ CSRF Protection (Double Submit Cookie pattern)  
✅ Role-based visibility (buttons visible only for logged-in users)  
✅ Token rotation on refresh  
✅ Auto-relogin using refresh token  
✅ EF Core + PostgreSQL ORM  
✅ Swagger API documentation  
✅ CORS configured for secure cross-origin frontend

---

## 🏗 Architecture

```
CareerHub/
 ├── CareerHub.Api/                 # ASP.NET Core backend
 │   ├── Controllers/               # API endpoints
 │   ├── Models/                    # EF entities (User, Profile, etc.)
 │   ├── Data/                      # AppDbContext + migrations
 │   ├── appsettings.json           # Configuration
 │   └── Program.cs                 # Entry point
 │
 └── careerhub-frontend/            # React + Vite frontend
     ├── src/
     │   ├── context/AuthContext.tsx
     │   ├── services/              # API calls
     │   ├── components/            # UI components
     │   └── pages/
     └── .env                       # Frontend API base URL
```

---

## 🧱 Backend Setup

### 1. Prerequisites

- .NET 8 SDK
- PostgreSQL (running locally or in Docker)
- Node.js 18+

### 2. Configure Environment

Edit `appsettings.json` or use secrets:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=CareerHub;Username=postgres;Password=yourpassword"
},
"Jwt": {
  "Key": "super_secret_key_here",
  "Issuer": "https://localhost:5058",
  "Audience": "https://localhost:5058"
}
```

### 3. Run Database Migrations

```bash
cd CareerHub.Api
dotnet ef database update
```

### 4. Launch API

```bash
dotnet watch run
```

Backend runs on **https://localhost:5058**

---

## 💻 Frontend Setup

### 1. Configure Environment

Create `frontend/.env`:

```
VITE_API_BASE_URL=https://localhost:5058/api
```

### 2. Install & Run

```bash
cd careerhub-frontend
npm install
npm run dev
```

Frontend runs on **https://localhost:3000**

---

## 🔐 Authentication & Security

### 🧠 Overview

Authentication uses:

- **Access Token (JWT)** – short-lived (~15 min), stored in **HttpOnly Secure Cookie**
- **Refresh Token** – long-lived (~7 days), also HttpOnly cookie
- **Token rotation** – each refresh invalidates the previous refresh token

### 🔁 Token Flow

1. **Login**

   - Client posts `/api/auth/login` with credentials
   - Server verifies user and issues `jwt` and `refreshToken` cookies
   - Frontend stores **no tokens in JS**, only relies on cookies

2. **Authenticated requests**

   - Browser automatically includes cookies
   - JWT middleware validates JWT
   - On expiry → backend returns 401

3. **Auto-refresh**

   - Frontend periodically calls `/api/auth/refresh`
   - New JWT + rotated refresh token returned

4. **Logout**
   - Frontend calls `/api/auth/logout`
   - Server deletes both cookies and revokes refresh token

### 🧱 Cookie Security

```csharp
new CookieOptions
{
    HttpOnly = true,
    Secure = true,
    SameSite = SameSiteMode.None,
    Path = "/",
    Expires = DateTime.UtcNow.AddMinutes(minutes)
};
```

| Setting         | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `HttpOnly`      | Prevents JS access (protects against XSS)                            |
| `Secure`        | Sends cookie only over HTTPS                                         |
| `SameSite=None` | Allows cross-site requests (for frontend–backend on different ports) |
| `Expires`       | Defines lifetime (short for JWT, longer for refresh)                 |

---

## 🛡 CSRF Protection

Implements **Double-Submit Cookie pattern**:

- Backend sets a `CSRF-TOKEN` cookie (non-HttpOnly)
- Frontend reads it and sends it in a custom header `X-CSRF-TOKEN`
- Backend validates that header value matches the cookie

**Exempt endpoints:** `/auth/login` and `/auth/register`

---

## 🔒 Environment Variables

| Key                                   | Description                       |
| ------------------------------------- | --------------------------------- |
| `Jwt:Key`                             | Strong random secret (≥ 256 bits) |
| `Jwt:Issuer`                          | Token issuer                      |
| `Jwt:Audience`                        | Token audience                    |
| `ConnectionStrings:DefaultConnection` | PostgreSQL connection             |
| `ASPNETCORE_ENVIRONMENT`              | `Development` / `Production`      |

---

## 💡 Best Practices

✅ Short JWT lifetime and refresh rotation  
✅ Hash refresh tokens in DB  
✅ Revoke old refresh tokens on logout  
✅ HttpOnly + Secure cookies — never use localStorage  
✅ CSRF protection for state-changing requests  
✅ BCrypt password hashing  
✅ Use HTTPS always  
✅ Limit CORS origins  
✅ Track revoked tokens (blocklist)  
✅ Use EF Core migrations  
✅ Handle 401 in frontend gracefully

---

## 🚀 Deployment Notes

**Frontend:**

- Serve via HTTPS (Vercel, Netlify, or Nginx + TLS)
- Set `VITE_API_BASE_URL` to your backend domain

**Backend:**

- Use HTTPS reverse proxy (Nginx)
- Set `Secure = true` for cookies
- Rotate `Jwt:Key` periodically
- Use a 32+ byte signing key
- Add HSTS and proper CORS rules
