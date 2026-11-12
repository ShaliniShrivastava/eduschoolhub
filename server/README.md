# EduSchoolHub — Authentication Module

## Overview

EduSchoolHub is a multi-tenant School Management SaaS platform. The authentication module manages user registration, login, Super Admin authentication, Google authentication, password change and recovery, session management, and role-based access foundations.

## Features

### 1. Super Admin Setup

- Initial Super Admin account creation using `scripts/createSuperAdmin.js`.
- Email uniqueness checks to prevent duplicate accounts.
- Password strength validation.
- Password hashing using bcrypt.
- Automatic `superAdmin` role assignment.
- Account activation by default.
- Support for creating additional Super Admin accounts when explicitly enabled.

#### Environment Configuration

Configure the following variables in `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
SUPER_ADMIN_NAME=Your Super Admin Name
SUPER_ADMIN_EMAIL=your_admin_email
SUPER_ADMIN_PASSWORD=your_strong_password
```

#### Password Requirements

The Super Admin password must contain:

- Minimum 8 characters.
- At least one uppercase letter (`A-Z`).
- At least one lowercase letter (`a-z`).
- At least one number (`0-9`).
- At least one special character, such as `@#$!%&*`.

#### Create the First Super Admin

Run the following command from the `server` directory:

```bash
npm run create:super-admin
```

#### Create an Additional Super Admin

Update the Super Admin details in `server/.env`, then run:

```bash
npm run create:super-admin -- --allow-multiple
```

### 2. Email and Password Authentication

- User registration for supported account types.
- Email and password login.
- Separate Super Admin login endpoint.
- Password verification using bcrypt.
- Account activation checks.
- Failed login attempt tracking.
- Temporary account lock after repeated failed login attempts.
- Remember Me support for Super Admin login.

### 3. Google Authentication

- Google ID token verification through the Google authentication service.
- Google registration for supported accounts.
- Google login for linked accounts.
- Linking a Google account to an authenticated user.
- Email verification and account-status checks where implemented.
- Protection against unauthorized account linking.

### 4. Change Password

Password change functionality allows an existing authenticated user to update their password, provided the corresponding flow is implemented and connected.

Expected security practices:

- Validate the submitted password information.
- Verify the existing password when required by the flow.
- Validate the new password against the project's password rules.
- Hash the new password using bcrypt before saving it.
- Never store passwords in plain text.

The existing `User` model can store the updated password. A separate model is only necessary if the implementation requires additional password-change records.

### 5. Forgot Password and Reset Password

- Forgot-password endpoint.
- OTP generation and email delivery through SMTP.
- OTP hashing before storage.
- OTP expiration and failed-attempt tracking.
- Password reset after successful OTP verification.
- Clearing relevant OTP and account-lock information after a successful reset.

The exact storage approach should match the current implementation. If OTP fields are stored in `User.js`, a separate password-reset model is not required for that flow.

### 6. Session Management

- JWT-based authentication through the existing session service.
- Authentication cookie handling.
- Middleware for validating authenticated sessions.
- Endpoint for retrieving the current authenticated user.
- Logout endpoint for clearing the authentication cookie.
- Remember Me support for Super Admin sessions.

### 7. Security Measures

- Password hashing with bcrypt.
- JWT secret configuration through environment variables.
- Authentication request rate limiting.
- Security headers using Helmet.
- CORS configuration with credential support.
- Request body size limits.
- Sensitive authentication fields excluded from public user responses.
- Backend verification of Google ID tokens.
- Authentication and role-based authorization middleware.

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint                  | Purpose                                     |
| ------ | ------------------------- | ------------------------------------------- |
| POST   | `/auth/register`          | Register a supported account                |
| POST   | `/auth/login`             | Email/password login                        |
| POST   | `/auth/super-admin/login` | Super Admin login                           |
| POST   | `/auth/google/register`   | Google registration                         |
| POST   | `/auth/google/login`      | Google login                                |
| POST   | `/auth/google/link`       | Link Google to an authenticated account     |
| POST   | `/auth/forgot-password`   | Request password-reset OTP                  |
| POST   | `/auth/reset-password`    | Reset password using OTP                    |
| GET    | `/auth/me`                | Get the current authenticated user          |
| POST   | `/auth/logout`            | Log out and clear the authentication cookie |
| GET    | `/health`                 | Check API server status                     |

**Note:** The table reflects the routes discussed during development. A dedicated change-password endpoint should be added to this documentation only after confirming its actual route and implementation.

## Environment Configuration

Configure the following variables in `server/.env` according to your local setup:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
CLIENT_URL=http://localhost:5173

SUPER_ADMIN_NAME=Your Super Admin Name
SUPER_ADMIN_EMAIL=your_admin_email
SUPER_ADMIN_PASSWORD=your_strong_password

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email_address
SMTP_PASS=your_email_app_password
SMTP_FROM=EduSchoolHub <your_email_address>
```

Keep actual credentials private. Never commit `.env` files, email app passwords, or production secrets to version control.

## Relevant Backend Structure

```text
server/
├── config/
│   ├── db.js
│   └── cors.js
├── models/
│   ├── User.js
│   └── ChangePassword.js
├── controllers/
│   └── authController.js
├── routes/
│   └── authRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── services/
│   ├── authService.js
│   ├── emailService.js
│   ├── googleAuthService.js
│   └── sessionService.js
├── validators/
│   └── authValidator.js
├── utils/
│   └── generateToken.js
├── scripts/
│   └── createSuperAdmin.js
└── server.js
```

This is a reference structure based on the files discussed during development. Keep the actual filenames in your repository. If `ChangePassword.js` does not exist, remove it from the tree. Include `PasswordReset.js` only if that is the actual filename used in your project.

## Running the Backend

From the `server` directory, install dependencies if required:

```bash
npm install
```

Configure the environment variables and start the backend using the script defined in `server/package.json`. For example, if the project defines a `dev` script:

```bash
npm run dev
```

The API base URL for local development is:

`http://localhost:5000/api`

## Testing and Verification Status

The authentication features have been developed in stages. The following flows should be tested end to end before being marked as fully verified:

- Super Admin creation and duplicate-account protection.
- Email/password registration and login.
- Super Admin login and Remember Me behavior.
- Google registration, login, and account linking.
- Change-password flow, if implemented.
- OTP email delivery and password reset.
- Cookie-based session restoration and logout.
- Access to protected endpoints.
- Role-based authorization.

Frontend login redirection, session restoration in the client, and protected dashboard access are separate client-side responsibilities and should be documented as complete only after implementation and testing.

### Google Login

The application supports Google Authentication, allowing users to sign in using their Google account.

**Features:**

- Sign in using a Google account.
- Verify Google ID tokens on the backend.
- Authenticate users securely using HTTP-only cookies.
- Support role-based access for authorized users.

**Configuration:**
Configure the required Google OAuth credentials and environment variables in the server and client `.env` files before using Google Login.

Date: 22 October 2026
Contact Enquiry Backend

- Added a MongoDB model: models/ContactMessage.js.
- Added controller logic for server-side validation and saving
  enquiries.
- Added POST /api/contact route with rate limiting.
- Registered the contact router in server.js.
- Reused the existing Nodemailer service for email notifications.
- Contact notification recipient uses the existing SUPER_ADMIN_EMAIL
  environment variable.
- Enquiries are saved before email delivery is attempted, so an email
  failure does not undo a saved enquiry.
  Book a Demo
- Existing demo router is registered in server.js at
  /api/demo-requests.
- Exact demo controller/model changes were not verified in the
  conversation; check existing files for implementation details.
  Files Involved
- server/models/ContactMessage.js --- enquiry schema.
- server/controllers/contactController.js --- validation, database
  save, email attempt.
- server/routes/contactRoutes.js --- contact endpoint and rate
  limit.
- server/server.js --- registers contact routes.
- server/services/emailService.js --- existing email service reused.
- server/routes/demoRoutes.js --- existing Book a Demo route.
- server/.env --- existing SMTP settings and SUPER_ADMIN_EMAIL.
  API
  POST /api/contact

Expected fields: fullName, schoolName, email, phone, role,
studentCount, message.
Run and Test
cd server
npm run dev

- Submit a valid enquiry and confirm it is stored in MongoDB.
- Verify the notification email.
- Test invalid fields and rate limiting.
- Test Book a Demo using the actual route defined in demoRoutes.js.
  Stack: Node.js, Express, MongoDB/Mongoose, Nodemailer. No Python is
  used in the application backend.

2/11/2026

## Demo Request & Contact Enquiry – Backend

### 1. Book a Demo API

- Created the `DemoRequest` model to store school demo enquiries in MongoDB.
- Added fields for school name, contact person, email, phone, student strength, role, preference, preferred date, preferred time and message.
- Updated `demoController.js` to validate incoming form data and save demo requests.
- Added email notification functionality for new demo requests.
- Added APIs to submit, retrieve and update demo requests.
- Configured public submission and protected Super Admin management routes.

**API Endpoint:** `POST /api/demo-requests`

### 2. Contact Enquiry API

- Updated the `ContactMessage` model to store contact enquiries.
- Added fields for full name, school name, email, phone, role, student count, interested plan, billing cycle and message.
- Added validation for required fields, email, phone number, role, student count, plan and billing preference.
- Added enquiry status management with `new`, `in-progress` and `resolved` statuses.
- Implemented MongoDB storage before email notification.
- Added email notifications for new contact enquiries.
- Configured rate limiting: maximum 5 submissions per 15 minutes.

**API Endpoint:** `POST /api/contact`

### 3. Server Configuration

- Imported and mounted Demo Request and Contact routes in `server.js`.
- Added database connection middleware using `ensureDBConnection`.
- Configured JSON body parsing, CORS and request rate limiting.
- Connected both APIs to the existing MongoDB connection.

### 4. Current Development Status

- Demo Request backend code updated.
- Contact Enquiry backend code updated.
- Both API routes configured in `server.js`.

3 November 2026,

# EduSchoolHub – Main Website Backend Updates

**Date:** 3 November 2026

## 1. Main Website Routes Consolidation

- Seven separate route files ko combine karke single `mainWebsiteRoutes.js` file banayi.
- Controllers ko separate rakha hai.
- Existing controller functions aur middleware preserve kiye hain.

**Updated Structure:**

```text
server/
└── routes/
    ├── mainWebsiteRoutes.js
    ├── authRoutes.js
    ├── superAdminRoutes.js
    └── googleAuthRoutes.js
```

## 2. Main Website APIs

Following pages ke APIs configure kiye:

- Home
- About
- Features
- Modules
- Pricing
- Contact
- Demo Requests

### Page Management APIs

Home, About, Features, Modules aur Pricing ke liye:

| Method | Purpose                  |
| ------ | ------------------------ |
| GET    | Public published content |
| GET    | Admin content            |
| PUT    | Save draft               |
| PATCH  | Publish draft            |

### Contact APIs

- Public contact enquiry submission.
- Rate limiting: 5 requests per 15 minutes.
- Existing contact controller and email notification functionality retained.

### Demo APIs

- Public demo request submission.
- Super Admin demo request listing.
- Super Admin demo request status update.

## 3. Server.js Updates

- All Main Website route imports replaced with a single route import.
- Main Website APIs mounted at `/api/main-website`.
- Existing authentication routes preserved.
- Google Login routes preserved.
- CORS configuration retained.
- Helmet security middleware retained.
- Cookie parser and JSON body parser retained.
- Database connection middleware retained.
- Authentication rate limiter retained.
- Vercel deployment configuration preserved.

### Main Website Route Mounting

```js
const mainWebsiteRoutes = require("./routes/mainWebsiteRoutes");

app.use("/api/main-website", ensureDBConnection);
app.use("/api/main-website", mainWebsiteRoutes);
```

**Current Progress:** Main Website routes consolidated, `server.js` updated

4/11/26

## Main Website Backend – API Development & Testing

Today, the Main Website backend APIs were completed and tested for the following sections:

- **Home:** Get, Admin Get, Save Draft, Publish.
- **About:** Get, Admin Get, Save Draft, Publish.
- **Features:** Get, Admin Get, Save Draft, Publish.
- **Modules:** Get, Admin Get, Save Draft, Publish.
- **Pricing:** Get, Admin Get, Save Draft, Publish.
- **Contact:** Submit Contact Enquiry, Get Contact Enquiries.
- **Demo:** Create Demo Request, Get Demo Requests, Update Demo Request.

### Key Implementation

- Implemented Draft–Review–Publish workflow for website content.
- Added Super Admin authentication for admin APIs.
- Added contact enquiry and demo request management.
- Tested all listed APIs successfully using Postman.

---

# 12 November 2026 – Remember Me & Backend Session Management

## 1. Remember Me Authentication

- Added Remember Me support to the existing email/password authentication flow.
- Supports the `rememberMe` Boolean field during login.
- When `rememberMe: true` is selected, the backend issues a Refresh Token valid for 7 days.
- When Remember Me is disabled, the Refresh Token has a 12-hour JWT expiry.
- Access Token validity is 15 minutes.
- Authentication tokens are stored in HTTP-only cookies.
- Secure cookie settings are configured according to the deployment environment.

## 2. Session Management APIs

| Method | Endpoint            | Purpose                                                            |
| ------ | ------------------- | ------------------------------------------------------------------ |
| POST   | `/api/auth/refresh` | Generate a new Access Token using the Refresh Token                |
| GET    | `/api/auth/me`      | Verify the current session and retrieve authenticated user details |
| POST   | `/api/auth/logout`  | Clear Access Token and Refresh Token cookies                       |

## 3. Session Refresh Workflow

- The backend verifies the Refresh Token using `JWT_REFRESH_SECRET`.
- Validates the token type, user ID, account status and user role.
- Generates a new Access Token after successful verification.
- Preserves the Remember Me setting while generating the new Access Token.
- Returns an authentication error if the Refresh Token is missing, expired or invalid.

**Note:** Refresh Token expiry is fixed from the original login time. Refreshing the Access Token does not extend the Refresh Token's 7-day validity.

## 4. Authentication Cookie Management

- Access Token and Refresh Token use HTTP-only cookies.
- Production cookies use `Secure` and `SameSite=None`.
- Local development cookies use `SameSite=Lax`.
- Cookie expiration is configured according to the Remember Me setting.
- Logout clears both authentication cookies.

## 5. Backend Testing – Postman

The following tests have been performed:

- Super Admin login with `rememberMe: true` – Successful.
- Access Token and Refresh Token cookie generation – Verified.
- Remember Me refresh API (`POST /api/auth/refresh`) – Successful.
- Session verification (`GET /api/auth/me`) – Successful.
- Logout and cookie-clearing verification – Pending.

## 6. Current Development Status

- Remember Me login logic implemented.
- Refresh Token generation and verification configured.
- Access Token renewal API configured.
- Current user session verification API configured.
- Logout API configured to clear authentication cookies.
- Postman login, refresh and session verification tested successfully.
