# AdFlow Pro Backend Server

This is the Node.js/Express backend for the AdFlow Pro marketplace application.

## Features

- **User Authentication**: JWT-based authentication with bcryptjs password hashing
- **Ad Management**: Create, list, and manage classified ads
- **Payment Processing**: Submit and verify payment proofs
- **Moderator Panel**: Review and approve/reject ads
- **Admin Dashboard**: Verify payments and manage users
- **Role-Based Access Control**: Support for client, moderator, admin, and super_admin roles
- **Database**: Supabase (PostgreSQL) for data persistence

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod
- **Environment**: dotenv

## Prerequisites

- Node.js 18+ and npm/pnpm
- Supabase account and project
- PostgreSQL database (via Supabase)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/alveena-002/adflow-pro.git
cd adflow-pro/server
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the server directory by copying `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
JWT_SECRET=your-secret-key-here
```

### 4. Database Setup

Run the migration SQL file to create the necessary tables:

```bash
# Login to Supabase SQL Editor and run:
# migrations/001_create_payments_table.sql
```

Or use the Supabase CLI:

```bash
supabase db push
```

### 5. Start the Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Quick Reference

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Ads**
- `GET /api/ads` - Get all public ads
- `GET /api/ads/:slug` - Get ad by slug
- `POST /api/ads` - Create new ad (protected)
- `GET /api/ads/my/listings` - Get user's ads (protected)

**Payments**
- `POST /api/payments` - Submit payment proof (client)
- `GET /api/payments/:payment_id` - Get payment details

**Moderator**
- `GET /api/moderator/ads` - Get ads for review
- `PUT /api/moderator/ads/:ad_id/review` - Review ad
- `GET /api/moderator/stats` - Get review stats

**Admin**
- `GET /api/admin/payments` - Get pending payments
- `PUT /api/admin/payments/:payment_id/verify` - Verify payment
- `PUT /api/admin/payments/:payment_id/reject` - Reject payment
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:user_id/role` - Update user role
- `DELETE /api/admin/users/:user_id` - Delete user
- `GET /api/admin/stats` - Get system stats

## Project Structure

```
server/
├── src/
│   ├── controllers/        # Business logic
│   │   ├── auth.controller.js
│   │   ├── ads.controller.js
│   │   ├── payments.controller.js
│   │   ├── moderator.controller.js
│   │   └── admin.controller.js
│   ├── routes/            # API routes
│   │   ├── auth.routes.js
│   │   ├── ads.routes.js
│   │   ├── payments.routes.js
│   │   ├── moderator.routes.js
│   │   └── admin.routes.js
│   ├── middlewares/       # Express middlewares
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│   ├── validators/        # Zod validation schemas
│   │   └── auth.validator.js
│   ├── db/               # Database configuration
│   │   └── db.js
│   └── index.js          # Application entry point
├── migrations/           # Database migrations
│   └── 001_create_payments_table.sql
├── .env.example         # Environment variables template
├── package.json         # Dependencies
└── README.md           # This file
```

## User Roles

| Role | Permissions |
|------|-------------|
| **Client** | Create ads, submit payment proof, view own ads |
| **Moderator** | Review ads, approve/reject content |
| **Admin** | Verify payments, manage users, view stats |
| **Super Admin** | All permissions |

## Authentication Flow

1. User registers or logs in
2. Server returns JWT token
3. Client stores token in localStorage
4. For protected endpoints, client sends token in `Authorization: Bearer <token>` header
5. Server verifies token and checks user role

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "Error message description"
}
```

Common status codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

## Deployment

### Deploy to Vercel

```bash
vercel deploy
```

### Deploy to Heroku

```bash
heroku create adflow-pro-api
git push heroku main
```

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

- `NODE_ENV=production`
- `JWT_SECRET=<strong-random-string>`
- `SUPABASE_URL=<your-supabase-url>`
- `SUPABASE_KEY=<your-supabase-key>`
- `PORT=<your-port>`

## Security Best Practices

- Always use HTTPS in production
- Keep `JWT_SECRET` secure and unique
- Use environment variables for sensitive data
- Validate and sanitize all user inputs
- Implement rate limiting for production
- Use CORS carefully and whitelist origins
- Keep dependencies updated

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

## Changelog

### Version 1.0.0 (Current)
- Initial backend implementation
- Authentication system
- Ad management
- Payment processing
- Moderator and admin panels
- Role-based access control
