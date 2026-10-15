## Super Admin Setup

Configure `MONGO_URI`, `SUPER_ADMIN_NAME`, `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` in `server/.env`.

**Password requirements:**
- Minimum 8 characters
- At least one uppercase letter (`A-Z`)
- At least one lowercase letter (`a-z`)
- At least one number (`0-9`)
- At least one special character (`@#$!%&*` etc.)

**Create the first Super Admin:**

```bash
npm run create:super-admin
```

**Create an additional Super Admin:**

Update the admin details in `server/.env`, then run:

```bash
npm run create:super-admin -- --allow-multiple
```


