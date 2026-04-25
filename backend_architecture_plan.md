# AdFlow Pro Backend Architecture Plan

## 1. Current Backend Overview

The existing backend for AdFlow Pro is built with Node.js, Express.js, and uses Supabase (PostgreSQL) as the database. Authentication is handled with JWT and bcryptjs, and request validation is done using Zod. The current implementation includes:

*   **Authentication:** User registration and login (`/api/auth/register`, `/api/auth/login`).
*   **Ad Management (Client):** Listing all ads, getting a single ad by slug, creating an ad, and getting ads specific to the logged-in user (`/api/ads`, `/api/ads/:slug`, `/api/ads/my/listings`).

## 2. Missing Functionalities based on `README.md`

Based on the `README.md` file, the following key functionalities for different user roles are currently missing or incomplete:

### Client Role
*   **Submit Payment Proof:** Clients need to be able to submit proof of payment for their ads.
*   **Track Ad Status:** While `getMyAds` exists, the mechanism for clients to track detailed ad status (e.g., 'Payment Pending', 'Under Review', 'Active', 'Rejected', 'Expired') and receive notifications is not fully defined.

### Moderator Role
*   **Review Submitted Ads:** Moderators need an interface and API endpoints to view ads that are 'Under Review'.
*   **Approve or Reject Content:** Moderators should be able to change the status of an ad to 'Active' or 'Rejected' after review.

### Admin Role
*   **Verify Payments:** Admins need to view payment proofs submitted by clients and mark payments as verified.
*   **Publish Ads:** After payment verification, admins should be able to change an ad's status to 'Active' (if not already done by a moderator).
*   **Manage Users:** Admins should have the ability to view, edit, and potentially delete user accounts, as well as change user roles.

### Super Admin Role
*   **Full System Access:** This implies all administrative functionalities, including potentially managing other admins and moderators.

## 3. Proposed Backend Enhancements

To address the missing functionalities, the following enhancements are proposed:

### 3.1. Database Schema Adjustments

To support the new functionalities, the Supabase schema will need to be extended. Specifically:

*   **`ads` table:**
    *   Add a `payment_status` column (e.g., `pending`, `verified`, `not_required`).
    *   Ensure `status` column can accommodate `draft`, `under_review`, `payment_pending`, `active`, `rejected`, `expired`.
    *   Add `moderator_notes` and `admin_notes` columns for review feedback.
*   **`payments` table (new):**
    *   `id` (PK)
    *   `ad_id` (FK to `ads` table)
    *   `user_id` (FK to `users` table)
    *   `amount`
    *   `currency`
    *   `proof_url` (URL to uploaded payment proof image/document)
    *   `status` (e.g., `submitted`, `verified`, `rejected`)
    *   `created_at`, `updated_at`
*   **`users` table:**
    *   Ensure `role` column can accommodate `client`, `moderator`, `admin`, `super_admin`.

### 3.2. API Endpoints and Logic

#### Client Endpoints
*   **`POST /api/ads/:id/payment`**: Submit payment proof for a specific ad.
    *   Requires `verifyToken` and `verifyRole('client')`.
    *   Uploads payment proof (e.g., image) to Supabase storage and stores the URL in the `payments` table.
    *   Updates the ad's `payment_status` to `pending`.

#### Moderator Endpoints
*   **`GET /api/moderator/ads`**: Get all ads with `status: 'under_review'`.
    *   Requires `verifyToken` and `verifyRole('moderator', 'admin', 'super_admin')`.
*   **`PUT /api/moderator/ads/:id/status`**: Update an ad's status (approve/reject).
    *   Requires `verifyToken` and `verifyRole('moderator', 'admin', 'super_admin')`.
    *   Accepts `status` (`active` or `rejected`) and `moderator_notes`.
    *   If approved, checks `payment_status`. If `payment_status` is `verified`, set ad `status` to `active`. If `payment_status` is `pending`, set ad `status` to `payment_pending`.

#### Admin Endpoints
*   **`GET /api/admin/payments`**: Get all payments with `status: 'submitted'`.
    *   Requires `verifyToken` and `verifyRole('admin', 'super_admin')`.
*   **`PUT /api/admin/payments/:id/verify`**: Verify a payment.
    *   Requires `verifyToken` and `verifyRole('admin', 'super_admin')`.
    *   Updates payment `status` to `verified`.
    *   If the associated ad's `status` is `payment_pending`, update ad `status` to `active`.
*   **`GET /api/admin/users`**: Get all users.
    *   Requires `verifyToken` and `verifyRole('admin', 'super_admin')`.
*   **`PUT /api/admin/users/:id/role`**: Update a user's role.
    *   Requires `verifyToken` and `verifyRole('admin', 'super_admin')`.
*   **`DELETE /api/admin/users/:id`**: Delete a user.
    *   Requires `verifyToken` and `verifyRole('admin', 'super_admin')`.

### 3.3. Authentication and Authorization

*   The existing `verifyToken` and `verifyRole` middleware will be leveraged for all new protected routes.
*   Ensure that `JWT_SECRET` is properly configured in the `.env` file.

## 4. Implementation Plan

1.  **Update Database Schema:** Create the `payments` table and add necessary columns to `ads` and `users` tables in Supabase.
2.  **Implement Payment Proof Submission:** Create a new controller and route for clients to upload payment proof.
3.  **Implement Moderator Panel APIs:** Develop controllers and routes for moderators to view and manage ads under review.
4.  **Implement Admin Panel APIs:** Develop controllers and routes for admins to verify payments and manage users.
5.  **Integrate with Frontend:** Ensure the frontend can consume these new APIs.
6.  **Testing:** Thoroughly test all new endpoints and functionalities, including edge cases and authorization checks.

This plan provides a roadmap for building out the remaining backend functionalities for AdFlow Pro, ensuring all user roles are supported as per the project requirements. This document will be updated as implementation progresses.
