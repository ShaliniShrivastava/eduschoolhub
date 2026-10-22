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

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Register a supported account |
| POST | `/auth/login` | Email/password login |
| POST | `/auth/super-admin/login` | Super Admin login |
| POST | `/auth/google/register` | Google registration |
| POST | `/auth/google/login` | Google login |
| POST | `/auth/google/link` | Link Google to an authenticated account |
| POST | `/auth/forgot-password` | Request password-reset OTP |
| POST | `/auth/reset-password` | Reset password using OTP |
| GET | `/auth/me` | Get the current authenticated user |
| POST | `/auth/logout` | Log out and clear the authentication cookie |
| GET | `/health` | Check API server status |

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
