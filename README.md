# Finance Tracker

## Description

Finance Tracker is a full-stack personal finance tracker application built with the PERN stack (PostgreSQL, Express.js, React.js, Node.js). It allows users to manage income, expenses, budgets, and financial goals.

## Database Name

The database name for this application is "Budget App".

## Schemas and Types for the Application

### 1. USERS

- **user_id (PK)**: Unique identifier for each user.
- **first_name**: First name of the user.
- **last_name**: Last name of the user.
- **email_id (UNIQUE)**: Unique email address associated with the user's account.
- **hash_password**: Hashed password for user authentication.
- **profile_picture**: URL or reference to the user's profile picture.

### 2. CATEGORY

- **category_id (PK)**: Unique identifier for each category.
- **category_name**: Name of the category (e.g., 'Rent', 'Salary').

### 3. TRANSACTIONS

- **transaction_id (PK)**: Auto-incrementing primary key for each transaction.
- **user_id (FK)**: Foreign key referencing `users(user_id)`.
- **amount**: Transaction amount.
- **category_id (FK)**: Foreign key referencing `category(category_id)`.
- **description**: Optional description of the transaction.
- **transaction_date**: Timestamp of the transaction.
- **type**: Type of transaction ('income' or 'expense').

### 4. BUDGET

- **budget_id (PK)**: Auto-incrementing primary key for each budget entry.
- **user_id (FK)**: Foreign key referencing `users(user_id)`.
- **category_id (FK)**: Foreign key referencing `category(category_id)`.
- **amount**: Budgeted amount.
- **month**: Month for which the budget is set (1-12).
- **year**: Year for which the budget is set.

### 5. GOAL

- **goal_id (PK)**: Auto-incrementing primary key for each goal.
- **user_id (FK)**: Foreign key referencing `users(user_id)`.
- **goal_name**: Name of the goal (e.g., 'Save for Vacation').
- **target_amount**: Target amount set for the goal.
- **current_amount**: Amount currently saved or achieved towards the goal.
- **deadline_date**: Deadline by which the goal should be achieved.
