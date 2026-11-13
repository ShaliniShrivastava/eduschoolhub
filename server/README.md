# EduSchoolHub – Backend Development

## Project Overview

EduSchoolHub is a multi-tenant School Management SaaS platform built using Node.js, Express.js, MongoDB and Mongoose.

The backend manages authentication, user sessions, role-based access, school management, website content, contact enquiries and demo requests.

## Technology Stack

- Node.js – Backend runtime
- Express.js – REST API development
- MongoDB & Mongoose – Database and data modelling
- JWT – Authentication and session management
- Bcrypt – Password hashing
- Nodemailer – Email notifications and OTP delivery
- Google OAuth – Google authentication
- Helmet – Security headers
- CORS – Cross-origin request configuration

---

## 1. Authentication Module

The authentication module manages user accounts, login, password recovery and secure sessions.

### Authentication APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a School Admin account |
| POST | `/api/auth/login` | Authenticate users using email and password |
| POST | `/api/auth/super-admin/login` | Authenticate Super Admin |
| POST | `/api/auth/google/register` | Register using Google authentication |
| POST | `/api/auth/google/login` | Login using a linked Google account |
| POST | `/api/auth/google/link` | Link Google account to an authenticated user |
| GET | `/api/auth/me` | Retrieve currently authenticated user details |
| PUT | `/api/auth/profile` | Update user profile information |
| PUT | `/api/auth/change-password` | Change the authenticated user's password |
| POST | `/api/auth/logout` | Clear authentication cookies |

### Super Admin Setup

- Initial Super Admin account creation through `scripts/createSuperAdmin.js`.
- Email uniqueness validation.
- Bcrypt password hashing.
- Automatic `superAdmin` role assignment.
- Account activation by default.
- Support for additional Super Admin accounts when explicitly enabled.

**Environment variables:**

```env
SUPER_ADMIN_NAME=Your Super Admin Name
SUPER_ADMIN_EMAIL=your_admin_email
SUPER_ADMIN_PASSWORD=your_password
```

**Create Super Admin:**

```bash
npm run create:super-admin
```

### Google Authentication

- Google ID token verification on the backend.
- Google registration and login.
- Secure Google account linking.
- Email matching and duplicate account checks.
- Account activation verification.

### Change Password

- Common API for authenticated user roles.
- Verifies the current password.
- Requires a minimum of 8 characters for the new password.
- Uppercase, lowercase, numbers and special characters are optional.
- Confirms new password matching.
- Prevents reuse of the current password.
- Hashes the updated password using bcrypt.
- Clears the access cookie after successful password change.

### Password Recovery APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/forgot-password` | Generate and email a password-reset OTP |
| POST | `/api/auth/reset-password` | Verify OTP and set a new password |

**Implementation:**
- Six-digit OTP generation.
- OTP stored as SHA-256 hash.
- OTP validity: 10 minutes.
- Maximum 5 OTP verification attempts.
- Password reset using bcrypt.
- OTP data cleared after successful reset.

---

## 2. Session Management

Implemented JWT-based authentication using HTTP-only cookies.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/refresh` | Generate a new access token using the refresh token |
| GET | `/api/auth/me` | Verify the current session and retrieve user details |
| POST | `/api/auth/logout` | Clear authentication cookies |

### Session Features

- Access Token validity: 15 minutes.
- Refresh Token validity: 12 hours without Remember Me.
- Refresh Token validity: 7 days with Remember Me.
- HTTP-only cookie-based token storage.
- Secure cookie configuration according to the environment.
- Refresh token verification and account-status checks.
- Remember Me preference maintained during session refresh.

**Note:** Refreshing an Access Token does not extend the original Refresh Token expiry.

---

## 3. Main Website Backend

Main Website APIs were consolidated into a single `mainWebsiteRoutes.js` file while keeping controllers separate.

**Base Route:** `/api/main-website`

### Website Content Management

The following sections have content management APIs:

- Home
- About
- Features
- Modules
- Pricing

| Method | Purpose |
|---|---|
| GET | Retrieve published website content |
| GET | Retrieve content for administration |
| PUT | Save website content as draft |
| PATCH | Publish saved draft |

### Contact Enquiry

**Endpoint:** `POST /api/contact`

- Accepts contact enquiries.
- Validates submitted information.
- Stores enquiries in MongoDB.
- Sends email notifications.
- Uses rate limiting of 5 submissions per 15 minutes.

### Book a Demo

**Base Route:** `/api/demo-requests`

- Submit demo requests.
- Store school and contact information.
- Retrieve demo requests for Super Admin.
- Update demo request status.
- Send email notifications for new requests.

---

## 4. Contact Enquiry & Demo Request Development

**Date: 22 October 2026**

### Contact Enquiry Backend

- Created `ContactMessage.js` model.
- Added server-side validation.
- Implemented enquiry storage in MongoDB.
- Integrated existing Nodemailer service.
- Used `SUPER_ADMIN_EMAIL` for notification recipients.
- Enquiries are saved before email delivery is attempted.

### Book a Demo

- Existing demo request routes registered.
- Demo request workflow integrated with the backend.
- Controller and model details maintained in their respective files.

**Main Files:**
- `models/ContactMessage.js`
- `controllers/contactController.js`
- `routes/contactRoutes.js`
- `routes/demoRoutes.js`
- `services/emailService.js`

---

## 5. Demo Request & Contact Enquiry Updates

**Date: 2/11/2026**

### Book a Demo API

- Created `DemoRequest` model.
- Added school, contact, student strength, preference, date, time and message fields.
- Implemented request validation and MongoDB storage.
- Added email notifications.
- Configured public submission and protected Super Admin management routes.

**Endpoint:** `POST /api/demo-requests`

### Contact Enquiry API

- Updated `ContactMessage` model.
- Added enquiry validation and status management.
- Supported `new`, `in-progress` and `resolved` statuses.
- Implemented MongoDB storage and email notifications.
- Configured rate limiting.

**Endpoint:** `POST /api/contact`

### Server Configuration

- Registered Demo Request and Contact routes in `server.js`.
- Added database connection handling.
- Configured JSON parsing, CORS and request rate limiting.

---

## 6. Main Website Routes Consolidation

**Date: 3 November 2026**

- Consolidated seven separate route files into `mainWebsiteRoutes.js`.
- Kept controllers separate.
- Preserved existing controller functions and middleware.
- Registered Main Website APIs under `/api/main-website`.
- Preserved authentication and Google Login routes.
- Retained CORS, Helmet, cookie parser and database connection middleware.
- Preserved Vercel deployment configuration.

**Updated route structure:**

```text
server/
└── routes/
    ├── mainWebsiteRoutes.js
    ├── authRoutes.js
    ├── superAdminRoutes.js
    └── googleAuthRoutes.js
```

---

## 7. Main Website API Development & Testing

**Date: 4/11/26**

Completed and tested backend APIs for:

- Home – Get, Admin Get, Save Draft and Publish.
- About – Get, Admin Get, Save Draft and Publish.
- Features – Get, Admin Get, Save Draft and Publish.
- Modules – Get, Admin Get, Save Draft and Publish.
- Pricing – Get, Admin Get, Save Draft and Publish.
- Contact – Submit and retrieve enquiries.
- Demo – Create, retrieve and update demo requests.

### Key Implementation

- Draft–Review–Publish workflow.
- Super Admin authentication for protected management APIs.
- Contact enquiry and demo request management.
- Postman testing for the listed APIs.

---

## 8. Remember Me & Backend Session Management

**Date: 12 November 2026**

### Remember Me Authentication

- Added Remember Me support to email/password authentication.
- Accepts a Boolean `rememberMe` field during login.
- Generates Refresh Tokens according to the selected session duration.
- Uses HTTP-only cookies for authentication tokens.

### Session Management APIs

- `POST /api/auth/refresh` – Renew Access Token.
- `GET /api/auth/me` – Retrieve authenticated user details.
- `POST /api/auth/logout` – Clear authentication cookies.

### Security & Configuration

- JWT-based Access and Refresh Tokens.
- Refresh Token verification using `JWT_REFRESH_SECRET`.
- Production cookies configured with `Secure` and `SameSite=None`.
- Local development cookies configured with `SameSite=Lax`.
- User status and role validation during session refresh.

### Postman Testing

- Super Admin login with Remember Me – Successful.
- Access and Refresh Token cookie generation – Verified.
- Refresh API – Successful.
- Current session verification – Successful.
- Logout cookie-clearing verification – Pending.

---

## 9. Change Password API

**Development Date: 13 November 2026**

Implemented a common Change Password API for authenticated users.

**Endpoint:** `PUT /api/auth/change-password`

### Features

- Current password verification.
- Minimum 8-character password requirement.
- Optional uppercase, lowercase, numbers and special characters.
- New and confirm password matching.
- Prevents using the existing password again.
- Bcrypt password hashing with 12 salt rounds.
- Clears the access cookie after successful password change.

### Testing Status

- Change Password API tested successfully using Postman.
- Local backend testing completed successfully.

---

## 10. Forgot Password & Reset Password APIs

**Development Date: 13 November 2026**

### Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

- Accepts registered email address.
- Generates a six-digit OTP.
- Sends OTP through the existing email service.
- Stores OTP as a SHA-256 hash.
- OTP expires after 10 minutes.
- Limits OTP verification attempts to 5.

### Reset Password

**Endpoint:** `POST /api/auth/reset-password`

- Verifies email and OTP.
- Checks OTP expiry and attempt limits.
- Requires a minimum of 8 password characters.
- Uppercase, lowercase, numbers and special characters are optional.
- Hashes the new password using bcrypt.
- Clears OTP information after successful reset.
- Resets failed login attempts and account lock status.

### Testing Status

- Forgot Password API tested successfully on localhost.
- OTP email delivery verified.
- Reset Password API implementation and route configured.
- Successful Reset Password API testing pending.

---

## 11. Security Implementation

- Bcrypt password hashing.
- JWT-based authentication.
- HTTP-only authentication cookies.
- Authentication middleware.
- Role-based authorization middleware.
- Google ID token verification.
- OTP hashing and expiry validation.
- Authentication rate limiting.
- Helmet security headers.
- CORS configuration.
- Environment-based secret management.
- Sensitive fields excluded from public user responses.

---

## 12. Environment Configuration

Configure the required variables in `server/.env` according to the enabled backend services.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

CLIENT_URL=http://localhost:5173

SUPER_ADMIN_NAME=Your Super Admin Name
SUPER_ADMIN_EMAIL=your_admin_email
SUPER_ADMIN_PASSWORD=your_password

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email_address
SMTP_PASS=your_email_app_password
SMTP_FROM=EduSchoolHub <your_email_address>
```

Keep actual credentials private. Never commit `.env` files, email app passwords or production secrets to GitHub.

---

## 13. Running the Backend

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Configure environment variables and start the backend using the script defined in `package.json`.

For a project with a `dev` script:

```bash
npm run dev
```

**Local API Base URL:**

```text
http://localhost:5000/api
```

---


**Project:** EduSchoolHub  
**Backend Stack:** Node.js, Express.js, MongoDB and Mongoose  
**API Testing:** Postman  
**Authentication:** JWT, HTTP-only Cookies and Google OAuth