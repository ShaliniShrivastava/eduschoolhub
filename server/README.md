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

| Method | Endpoint                      | Purpose                                       |
| ------ | ----------------------------- | --------------------------------------------- |
| POST   | `/api/auth/register`          | Register a School Admin account               |
| POST   | `/api/auth/login`             | Authenticate users using email and password   |
| POST   | `/api/auth/super-admin/login` | Authenticate Super Admin                      |
| POST   | `/api/auth/google/register`   | Register using Google authentication          |
| POST   | `/api/auth/google/login`      | Login using a linked Google account           |
| POST   | `/api/auth/google/link`       | Link Google account to an authenticated user  |
| GET    | `/api/auth/me`                | Retrieve currently authenticated user details |
| PUT    | `/api/auth/profile`           | Update user profile information               |
| PUT    | `/api/auth/change-password`   | Change the authenticated user's password      |
| POST   | `/api/auth/logout`            | Clear authentication cookies                  |

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

| Method | Endpoint                    | Purpose                                 |
| ------ | --------------------------- | --------------------------------------- |
| POST   | `/api/auth/forgot-password` | Generate and email a password-reset OTP |
| POST   | `/api/auth/reset-password`  | Verify OTP and set a new password       |

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

| Method | Endpoint            | Purpose                                              |
| ------ | ------------------- | ---------------------------------------------------- |
| POST   | `/api/auth/refresh` | Generate a new access token using the refresh token  |
| GET    | `/api/auth/me`      | Verify the current session and retrieve user details |
| POST   | `/api/auth/logout`  | Clear authentication cookies                         |

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

| Method | Purpose                             |
| ------ | ----------------------------------- |
| GET    | Retrieve published website content  |
| GET    | Retrieve content for administration |
| PUT    | Save website content as draft       |
| PATCH  | Publish saved draft                 |

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

# EduSchoolHub – Backend Development Updates

## 22 October 2026 – Contact Enquiry Backend

### 1. Contact Enquiry API

- Created the Contact Enquiry functionality to store user enquiries in MongoDB.
- Added server-side validation for required fields.
- Added support for full name, school name, email, phone, role, student count, interested plan, billing cycle and message.
- Reused the existing Nodemailer email service.
- Configured notification emails using the `SUPER_ADMIN_EMAIL` environment variable.
- Enquiries are saved before email delivery is attempted.
- Added rate limiting to prevent excessive submissions.

### 2. Contact Enquiry Files

- `server/models/ContactMessage.js` – Contact enquiry schema.
- `server/controllers/contactController.js` – Enquiry validation, database operations and email notification.
- `server/routes/contactRoutes.js` – Contact API routes.
- `server/services/emailService.js` – Existing email service.

### 3. Contact Enquiry Workflow

- Authenticated users can submit contact enquiries.
- Users can view their own enquiries.
- Super Admin can view all enquiries.
- Super Admin can open individual enquiries and manage them.
- Opening an enquiry changes its status from `submitted` to `seen`.
- Super Admin can delete enquiries.

---

## 2 November 2026 – Demo Request & Contact Enquiry Backend

### 1. Book a Demo API

- Created the `DemoRequest` model to store school demo requests.
- Added fields for:
  - School name
  - Contact name
  - Email
  - Phone
  - Student count
  - Role
  - Online/Offline preference
  - Preferred date
  - Preferred time
  - Message
- Updated `demoController.js` with server-side validation and database operations.
- Added email notification to Super Admin for new demo requests.
- Preserved the existing email notification functionality.

### 2. Demo Request Workflow

- Authenticated users can submit demo requests.
- Users can view their own demo requests.
- Super Admin can view all demo requests.
- Super Admin can open individual requests.
- Opening a pending request automatically changes its status to `seen`.
- Super Admin can manage request details and delete requests.

### 3. Demo Request Statuses

- `pending`
- `seen`
- `contacted`
- `scheduled`
- `completed`
- `cancelled`

### 4. Contact Enquiry Updates

- Added authenticated enquiry submission.
- Added an API to retrieve enquiries belonging to the logged-in user.
- Added an API to retrieve an individual enquiry.
- Added Super Admin enquiry management and deletion.

---

## 3 November 2026 – Main Website Backend Updates

### 1. Main Website Routes Consolidation

- Consolidated seven separate Main Website route files into one `mainWebsiteRoutes.js` file.
- Kept individual controllers separate.
- Preserved existing controller functions and middleware.
- Mounted Main Website APIs under `/api/main-website`.

### 2. Main Website Pages

The following pages are managed through the Main Website backend:

1. Home
2. About
3. Features
4. Modules
5. Pricing
6. Contact
7. Demo Requests

### 3. Page Content Management APIs

Home, About, Features, Modules and Pricing support the following operations:

| Method | Purpose                            |
| ------ | ---------------------------------- |
| GET    | Fetch published page content       |
| GET    | Fetch page content for Super Admin |
| PUT    | Save page content as draft         |
| POST   | Publish saved draft                |

### 4. Contact APIs

- Submit Contact Enquiry.
- Get My Contact Enquiries.
- Get All Contact Enquiries – Super Admin.
- Get Contact Enquiry by ID.
- Delete Contact Enquiry – Super Admin.

### 5. Demo Request APIs

- Create Demo Request.
- Get My Demo Requests.
- Get All Demo Requests – Super Admin.
- Get Demo Request by ID.
- Update Demo Request – Super Admin.
- Delete Demo Request – Super Admin.

### 6. Server Configuration

- Registered the consolidated Main Website routes in `server.js`.
- Mounted routes at `/api/main-website`.
- Preserved existing authentication and Google Login routes.
- Retained CORS configuration.
- Retained Helmet security middleware.
- Retained cookie parser and JSON body parsing.
- Connected APIs with the existing MongoDB connection.
- Preserved the existing database connection middleware.

---

## 4 November 2026 – Main Website API Development & Testing

### 1. Page Management APIs

Configured and tested the following operations:

- Home – Get, Admin Get, Save Draft, Publish.
- About – Get, Admin Get, Save Draft, Publish.
- Features – Get, Admin Get, Save Draft, Publish.
- Modules – Get, Admin Get, Save Draft, Publish.
- Pricing – Get, Admin Get, Save Draft, Publish.

### 2. Contact and Demo APIs

- Contact Enquiry submission and retrieval APIs.
- Demo Request creation and retrieval APIs.
- Demo Request management APIs.

### 3. Key Implementation

- Implemented the Draft–Review–Publish workflow for Main Website content.
- Added Super Admin authentication for administrative APIs.
- Added Contact Enquiry and Demo Request management.
- Performed API testing using Postman.

---

## 12 November 2026 – Remember Me & Backend Session Management

### 1. Remember Me Authentication

- Added Remember Me support to the existing email/password authentication flow.
- Supports the `rememberMe` Boolean field during login.
- When `rememberMe: true`, the Refresh Token is valid for 7 days.
- When Remember Me is disabled, the Refresh Token has a 12-hour expiry.
- Access Token validity is 15 minutes.
- Authentication tokens are stored in HTTP-only cookies.
- Cookie security settings are configured according to the deployment environment.

### 2. Session Management APIs

| Method | Endpoint            | Purpose                                          |
| ------ | ------------------- | ------------------------------------------------ |
| POST   | `/api/auth/refresh` | Generate a new Access Token                      |
| GET    | `/api/auth/me`      | Verify current session and retrieve user details |
| POST   | `/api/auth/logout`  | Clear authentication cookies                     |

### 3. Session Refresh Workflow

- Verifies the Refresh Token.
- Validates token type, user ID, account status and role.
- Generates a new Access Token after successful verification.
- Preserves the Remember Me setting.
- Rejects missing, expired or invalid Refresh Tokens.

### 4. Authentication Cookie Management

- Access Token and Refresh Token use HTTP-only cookies.
- Production cookies use `Secure` and `SameSite=None`.
- Local development cookies use `SameSite=Lax`.
- Cookie expiration follows the Remember Me setting.
- Logout clears both authentication cookies.

### 5. Postman Testing

- Super Admin login with Remember Me enabled – Successful.
- Access Token and Refresh Token generation – Verified.
- Refresh API – Successful.
- Current session verification API – Successful.
- Logout cookie-clearing verification – Pending.

---

## 12 November 2026 – Change Password API

### 1. Change Password Functionality

- Implemented a common Change Password API for authenticated user roles.
- Uses the existing authentication middleware.
- Verifies the current password before changing it.
- Validates the new password and confirmation.
- Prevents using the same password again.
- Hashes the new password using bcrypt with 12 salt rounds.
- Clears the Access Token cookie after successful password change.
- Requires the user to log in again with the new password.

### 2. API Details

| Method | Endpoint                    | Access             |
| ------ | --------------------------- | ------------------ |
| PUT    | `/api/auth/change-password` | Authenticated User |

### 3. Request Body

```json
{
  "currentPassword": "CurrentPassword123",
  "newPassword": "NewPassword123",
  "confirmPassword": "NewPassword123"
}
```

### 4. Testing

- Change Password API tested successfully using Postman.
- Local backend API testing completed successfully.

---

## 13 November 2026 – Forgot Password & Reset Password APIs

### 1. Forgot Password API

| Detail   | Value                       |
| -------- | --------------------------- |
| Method   | POST                        |
| Endpoint | `/api/auth/forgot-password` |
| Purpose  | Request password-reset OTP  |

Features:

- Generates a 6-digit OTP.
- Sends OTP to the registered email address.
- OTP expires after 10 minutes.
- Stores OTP as a SHA-256 hash.
- Allows a maximum of 5 OTP verification attempts.
- Uses a generic response to protect account privacy.

### 2. Reset Password API

| Detail   | Value                      |
| -------- | -------------------------- |
| Method   | POST                       |
| Endpoint | `/api/auth/reset-password` |
| Purpose  | Reset password using OTP   |

Features:

- Verifies email and OTP.
- Checks OTP expiry and attempt limits.
- Requires a minimum password length of 8 characters.
- Hashes the new password using bcrypt with 12 salt rounds.
- Clears OTP data after successful password reset.
- Resets failed login attempts and account lock status.

### 3. Security Measures

- OTP is never stored in plain text.
- Uses timing-safe OTP comparison.
- Expired OTPs cannot be reused.
- Limits incorrect OTP attempts.

### 4. Testing Status

- Forgot Password API tested successfully on localhost.
- OTP email delivery verified.
- Reset Password API implementation and route are available.
- Successful Reset Password API testing is pending.

---

## 14 November 2026 – Main Website Content Management & Pricing Updates

### 1. Main Website Content Model

Updated the existing `MainWebsiteContent` model to manage all five Main Website pages using a single model.

Supported pages:

- Home
- About
- Features
- Modules
- Pricing

### 2. Content Management Fields

| Field              | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `page`             | Identifies the Main Website page               |
| `draftContent`     | Stores unpublished content                     |
| `publishedContent` | Stores content visible on the public website   |
| `updatedBy`        | Stores the ID of the last updating Super Admin |
| `publishedAt`      | Stores the last successful publishing date     |

### 3. Draft–Publish Workflow

- Super Admin saves page changes as draft content.
- Draft content remains unpublished until approved for publishing.
- Publishing copies draft content into `publishedContent`.
- Public website APIs fetch only published content.
- Each page is managed independently using its `page` value.

### 4. Pricing Controller

Reviewed the existing `pricingController.js`, which uses the shared `MainWebsiteContent` model.

Implemented controller functions:

- `getPricingPage` – Fetch published Pricing content.
- `getPricingPageForAdmin` – Fetch Pricing content for Super Admin.
- `savePricingPageDraft` – Save Pricing changes as draft.
- `publishPricingPage` – Publish the saved Pricing draft.

### 5. Pricing API Routes

| Method | Endpoint                            | Access      | Purpose                       |
| ------ | ----------------------------------- | ----------- | ----------------------------- |
| GET    | `/api/main-website/pricing`         | Public      | Get published Pricing content |
| GET    | `/api/main-website/pricing/admin`   | Super Admin | Get Pricing content for admin |
| PUT    | `/api/main-website/pricing/draft`   | Super Admin | Save Pricing draft            |
| POST   | `/api/main-website/pricing/publish` | Super Admin | Publish Pricing draft         |

### 6. Postman Testing Status

Pricing API testing is pending.

Planned testing sequence:

1. Get Published Pricing.
2. Get Pricing For Admin.
3. Save Pricing Draft.
4. Publish Pricing.
5. Fetch published Pricing again to verify the changes.

### 7. Frontend Integration – Pending

- Connect the existing `Pricing.jsx` page to the public Pricing API.
- Replace static plan data with published backend content.
- Display the latest published plans on the public website.
- Connect the Super Admin Pricing editor with the draft and publish APIs.

---

## Current Development Status – 14 November 2026

| Module / Feature                 | Status                                               |
| -------------------------------- | ---------------------------------------------------- |
| Contact Enquiry Backend          | Implemented                                          |
| Demo Request Backend             | Implemented                                          |
| Main Website Route Consolidation | Completed                                            |
| Home Page Content APIs           | Configured and tested                                |
| About Page Content APIs          | Configured and tested                                |
| Features Page Content APIs       | Configured and tested                                |
| Modules Page Content APIs        | Configured and tested                                |
| Pricing Page Content APIs        | Configured; Postman testing pending                  |
| Remember Me Authentication       | Implemented                                          |
| Session Refresh API              | Tested successfully                                  |
| Current User Session API         | Tested successfully                                  |
| Change Password API              | Tested successfully                                  |
| Forgot Password API              | Tested successfully                                  |
| Reset Password API               | Implementation available; successful testing pending |
| Dynamic Pricing Frontend         | Pending                                              |
