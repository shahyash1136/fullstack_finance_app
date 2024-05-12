# Finance Tracker

Finance Tracker is a full-stack personal finance tracker application built with the PERN stack (PostgreSQL, Express.js, React.js, Node.js). It allows users to manage income, expenses, budgets, and financial goals.

## Database Name

The database name for this application is "Budget App".

## Schemas and Types for the application

### 1. USERS

- **user_id (PK)**: Unique identifier for each user.
- **first_name**: First name of the user.
- **last_name**: Last name of the user.
- **email_id (UNIQUE)**: Unique email address associated with the user's account.
- **hash_password**: Hashed password for user authentication.
- **profile_picture**: URL or reference to the user's profile picture.
