# Healthcare Application

A modern healthcare platform that connects patients with doctors, facilitating easy appointment scheduling and medical record management.

## Features

### Authentication & Authorization

- Multi-role user system (Patient, Doctor, Admin)
- Multiple authentication methods:
  - Email/Password registration and login
  - Google OAuth integration
  - Facebook OAuth integration
- JWT-based authentication
- Role-based access control
- Password reset functionality
- Email verification system

#### Authentication Acceptance Criteria

##### Google OAuth

- Users can sign in using their Google account
- Application requests necessary permissions (email, profile)
- Successfully creates new user account on first login
- Properly links existing accounts with matching email
- Redirects to home page after successful authentication
- Handles authentication errors gracefully
- Maintains session across page refreshes

##### Facebook OAuth

- Users can sign in using their Facebook account
- Application requests required permissions (email, public_profile)
- Creates new user account on first login
- Links to existing accounts with matching email
- Properly handles cases where email is not provided
- Uses fallback email format (facebookId@facebook.com) when email is missing
- Redirects to home page after successful authentication
- Handles authentication errors with appropriate messages
- Maintains session state properly

##### Email/Password Authentication

- Users can register with email and password
- Validates email format and password strength
- Prevents duplicate email registrations
- Securely hashes passwords before storage
- Allows users to sign in with registered credentials
- Provides appropriate error messages for invalid credentials
- Maintains session using JWT tokens
- Allows users to sign out

##### General Authentication Requirements

- Secure session management
- Protected route access for authenticated users
- Proper error handling and user feedback
- Responsive design for authentication forms
- Cross-browser compatibility
- Mobile-friendly authentication flows

### User Management

- Comprehensive user profiles for both patients and doctors
- Profile management and updates
- Specialized doctor profiles with medical specializations
- User verification system

### Patient Features

- Book appointments with doctors
- View medical history
- Manage personal health records
- Track appointment status
- Rate and review doctors
- View doctor profiles and specializations

### Doctor Features

- Manage appointment schedules
- View patient medical histories
- Update appointment status
- Manage availability calendar
- Provide medical prescriptions
- View patient reviews and ratings

## Technical Stack

### Frontend

- Next.js 14 with App Router
- React 18
- Tailwind CSS for styling
- TypeScript for type safety
- Context API for state management
- React Query for data fetching
- Axios for API calls

### Backend

- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Passport.js for OAuth
- Express-validator for input validation
- Bcrypt for password hashing

## API Documentation

### Authentication Endpoints

#### Register User

```http
POST /auth/register
```

Request Body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "dateOfBirth": "ISO8601 date",
  "gender": "male|female|other",
  "phone": "string",
  "address": "string",
  "role": "patient|doctor|admin",
  "specialization": "string (required for doctors)"
}
```

Response:

```json
{
  "token": "JWT token",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

#### Login

```http
POST /auth/login
```

Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "token": "JWT token",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

#### OAuth Authentication

##### Google OAuth

```http
GET /auth/google
```

Query Parameters:

- `role`: (optional) Desired user role
- `callbackUrl`: (optional) URL to redirect after authentication

##### Facebook OAuth

```http
GET /auth/facebook
```

Query Parameters:

- `role`: (optional) Desired user role
- `callbackUrl`: (optional) URL to redirect after authentication

#### Verify Token

```http
POST /auth/verify-token
```

Request Body:

```json
{
  "token": "string"
}
```

Response:

```json
{
  "token": "JWT token",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

### User Management Endpoints

#### Get User Profile

```http
GET /users/profile
```

Headers:

- `Authorization`: Bearer {token}

Response:

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "dateOfBirth": "date",
  "gender": "string",
  "phone": "string",
  "address": "string",
  "specialization": "string (for doctors)",
  "isVerified": "boolean"
}
```

#### Update User Profile

```http
PUT /users/profile
```

Headers:

- `Authorization`: Bearer {token}

Request Body:

```json
{
  "name": "string",
  "dateOfBirth": "date",
  "gender": "string",
  "phone": "string",
  "address": "string",
  "specialization": "string (for doctors)"
}
```

## Setup and Installation

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
# Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ../app
npm install
```

3. Set up environment variables

```bash
# Backend (.env)
cp api/.env.example api/.env
# Frontend (.env)
cp app/.env.example app/.env
```

4. Configure environment variables:

- Backend (.env):

  - MongoDB connection string
  - JWT secret
  - OAuth credentials (Google, Facebook)
  - SMTP settings for email
  - Session secret
  - Frontend URL

- Frontend (.env):
  - Backend API URL
  - OAuth client IDs

5. Start the development servers

```bash
# Start backend server
cd api
npm run dev

# Start frontend server
cd ../app
npm run dev
```

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Session management for OAuth
- CORS protection
- Input validation and sanitization
- Secure password reset flow
- Rate limiting on authentication endpoints
- XSS protection
- CSRF protection
- Secure HTTP headers

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses follow the format:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "Field name",
      "message": "Error message"
    }
  ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
