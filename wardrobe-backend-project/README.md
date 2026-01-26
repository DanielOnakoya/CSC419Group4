# Authentication API

A secure backend authentication system built with Node.js, Express.js, and Supabase.

## Features

- User registration with email and password
- Secure login with credential validation
- Token-based logout
- Password hashing and secure storage via Supabase
- JWT-based session management

## Getting Started

### Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. Register a New User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### 3. Logout

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

### 4. Get Current User

**Endpoint:** `GET /api/auth/user`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "timestamp"
  }
}
```

## Security

- Passwords are hashed using bcrypt via Supabase
- JWT tokens are used for authentication
- All sensitive operations require valid tokens
- CORS is enabled for cross-origin requests

## Testing with cURL

### Register:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Logout:
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

# Supabase Setup

Step 1: Set Up Supabase Project
Go to Supabase Dashboard

Click "New Project"

Enter project name (e.g., "wardrobe-backend")

Set database password

Choose region closest to your users

Wait for database to provision (2-3 minutes)

Step 2: Get Connection Credentials
Go to Project Settings → API

Copy URL → set as SUPABASE_URL in .env

Copy anon public key → set as SUPABASE_ANON_KEY in .env

Step 3: Set Up Database Schema
Open SQL Editor in Supabase Dashboard

Create users table:

sql

CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);
Set up Row Level Security (RLS) policies:

sql

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can read only their own data
CREATE POLICY "Users can view own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

-- Create policy: Users can update only their own data
CREATE POLICY "Users can update own profile" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = id);
Step 4: Set Up Authentication Triggers
Create a function to handle new user registration:

sql

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, created_at)
    VALUES (NEW.id, NEW.email, NEW.created_at);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
Create trigger to automatically create user record:

sql

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
Step 5: Update Your .env File
Create or update your .env file in the project root:

env

SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
PORT=3000
Step 6: Test the Connection
Start your server:

bash

npm run dev
You should see the debug output from supabase.js with ✅ marks

Step 7: Verify Database Operations