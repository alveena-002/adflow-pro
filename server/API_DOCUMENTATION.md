# AdFlow Pro Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "string (min 2 chars)",
  "email": "string (valid email)",
  "password": "string (min 6 chars)",
  "phone": "string (optional)",
  "city": "string (optional)"
}
```

**Response (201):**
```json
{
  "message": "Account created successfully",
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "client"
  }
}
```

---

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "client|moderator|admin|super_admin"
  }
}
```

---

## Ads Endpoints

### Get All Public Ads
**GET** `/ads`

Retrieve all published ads with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category ID
- `city` (optional): Filter by city ID
- `search` (optional): Search by ad title
- `sort` (optional): Sort order

**Response (200):**
```json
{
  "ads": [
    {
      "id": "uuid",
      "title": "string",
      "slug": "string",
      "description": "string",
      "price": "number",
      "status": "published",
      "category_id": "uuid",
      "city_id": "uuid",
      "package_id": "uuid",
      "user_id": "uuid",
      "created_at": "timestamp"
    }
  ]
}
```

---

### Get Ad by Slug
**GET** `/ads/:slug`

Retrieve a specific published ad by its slug.

**Response (200):**
```json
{
  "ad": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "description": "string",
    "price": "number",
    "status": "published",
    "created_at": "timestamp"
  }
}
```

---

### Create New Ad
**POST** `/ads`

Create a new ad (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "category_id": "uuid",
  "city_id": "uuid",
  "package_id": "uuid",
  "price": "number"
}
```

**Response (201):**
```json
{
  "message": "Ad created successfully",
  "ad": {
    "id": "uuid",
    "title": "string",
    "slug": "string",
    "status": "draft",
    "created_at": "timestamp"
  }
}
```

---

### Get My Ads
**GET** `/ads/my/listings`

Retrieve all ads created by the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "ads": [
    {
      "id": "uuid",
      "title": "string",
      "status": "draft|under_review|payment_pending|active|rejected|expired",
      "created_at": "timestamp"
    }
  ]
}
```

---

## Payments Endpoints

### Submit Payment Proof
**POST** `/payments`

Submit payment proof for an ad (client only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "ad_id": "uuid",
  "amount": "number",
  "currency": "string (default: PKR)"
}
```

**Response (201):**
```json
{
  "message": "Payment proof submitted successfully",
  "payment": {
    "id": "uuid",
    "ad_id": "uuid",
    "amount": "number",
    "currency": "string",
    "status": "submitted"
  }
}
```

---

### Get Payment Details
**GET** `/payments/:payment_id`

Retrieve payment details (client can view own, admin/moderator can view all).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "payment": {
    "id": "uuid",
    "ad_id": "uuid",
    "user_id": "uuid",
    "amount": "number",
    "currency": "string",
    "status": "submitted|verified|rejected",
    "created_at": "timestamp"
  }
}
```

---

## Moderator Endpoints

### Get Ads for Review
**GET** `/moderator/ads`

Retrieve ads pending review (moderator, admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (default: "under_review")

**Response (200):**
```json
{
  "ads": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "status": "under_review",
      "user_id": "uuid",
      "created_at": "timestamp"
    }
  ]
}
```

---

### Review Ad (Approve/Reject)
**PUT** `/moderator/ads/:ad_id/review`

Approve or reject an ad under review (moderator, admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "active|rejected",
  "moderator_notes": "string (optional)"
}
```

**Response (200):**
```json
{
  "message": "Ad approved/rejected successfully",
  "ad": {
    "id": "uuid",
    "title": "string",
    "status": "active|payment_pending|rejected",
    "moderator_notes": "string",
    "reviewed_at": "timestamp"
  }
}
```

---

### Get Review Statistics
**GET** `/moderator/stats`

Get statistics about ads under review (moderator, admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "stats": {
    "underReview": "number",
    "pendingPayment": "number",
    "active": "number"
  }
}
```

---

## Admin Endpoints

### Get Payments for Verification
**GET** `/admin/payments`

Retrieve payments pending verification (admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (default: "submitted")

**Response (200):**
```json
{
  "payments": [
    {
      "id": "uuid",
      "ad_id": "uuid",
      "user_id": "uuid",
      "amount": "number",
      "status": "submitted",
      "created_at": "timestamp"
    }
  ]
}
```

---

### Verify Payment
**PUT** `/admin/payments/:payment_id/verify`

Verify a submitted payment (admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "admin_notes": "string (optional)"
}
```

**Response (200):**
```json
{
  "message": "Payment verified successfully",
  "payment": {
    "id": "uuid",
    "status": "verified",
    "verified_at": "timestamp"
  }
}
```

---

### Reject Payment
**PUT** `/admin/payments/:payment_id/reject`

Reject a submitted payment (admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "admin_notes": "string (optional)"
}
```

**Response (200):**
```json
{
  "message": "Payment rejected successfully",
  "payment": {
    "id": "uuid",
    "status": "rejected",
    "rejected_at": "timestamp"
  }
}
```

---

### Get All Users
**GET** `/admin/users`

Retrieve all users with optional filtering (admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `role` (optional): Filter by role (client, moderator, admin, super_admin)
- `search` (optional): Search by name or email

**Response (200):**
```json
{
  "users": [
    {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "phone": "string",
      "city": "string",
      "role": "client|moderator|admin|super_admin",
      "created_at": "timestamp"
    }
  ]
}
```

---

### Update User Role
**PUT** `/admin/users/:user_id/role`

Change a user's role (admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "role": "client|moderator|admin|super_admin"
}
```

**Response (200):**
```json
{
  "message": "User role updated successfully",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

---

### Delete User
**DELETE** `/admin/users/:user_id`

Delete a user account (admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

### Get Admin Statistics
**GET** `/admin/stats`

Get system-wide statistics (admin, super_admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "stats": {
    "users": {
      "client": "number",
      "moderator": "number",
      "admin": "number",
      "super_admin": "number"
    },
    "ads": {
      "draft": "number",
      "under_review": "number",
      "payment_pending": "number",
      "active": "number",
      "rejected": "number",
      "expired": "number"
    },
    "payments": {
      "submitted": "number",
      "verified": "number",
      "rejected": "number"
    },
    "totalUsers": "number",
    "totalAds": "number",
    "totalPayments": "number"
  }
}
```

---

## Health Check

### API Health
**GET** `/health`

Check if the API is running.

**Response (200):**
```json
{
  "status": "ok",
  "message": "AdFlow Pro API running"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

### Common HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions for this resource |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| **Client** | Create ads, submit payment proof, view own ads |
| **Moderator** | Review ads, approve/reject content, view review stats |
| **Admin** | Verify payments, manage users, view system stats |
| **Super Admin** | All permissions, can manage other admins |

---

## Example Workflows

### Workflow 1: Client Posting an Ad

1. **Register/Login** → Get JWT token
2. **Create Ad** → POST `/ads` with ad details (status: draft)
3. **Submit Payment** → POST `/payments` with amount and currency
4. **Wait for Review** → Ad moves to "under_review" status
5. **Moderator Reviews** → PUT `/moderator/ads/:id/review` (approve/reject)
6. **Admin Verifies Payment** → PUT `/admin/payments/:id/verify`
7. **Ad Goes Live** → Status changes to "active"

### Workflow 2: Moderator Reviewing Ads

1. **Login** → Get JWT token with role: "moderator"
2. **Get Ads for Review** → GET `/moderator/ads`
3. **Review Each Ad** → PUT `/moderator/ads/:id/review` with status and notes
4. **View Stats** → GET `/moderator/stats` to track progress

### Workflow 3: Admin Managing Payments

1. **Login** → Get JWT token with role: "admin"
2. **Get Pending Payments** → GET `/admin/payments?status=submitted`
3. **Verify Payment** → PUT `/admin/payments/:id/verify` with notes
4. **View Stats** → GET `/admin/stats` for system overview

---

## Notes

- All timestamps are in ISO 8601 format
- UUIDs are used for all resource IDs
- Pagination may be added in future versions
- Rate limiting may be implemented for production
- All endpoints validate input using Zod schemas
