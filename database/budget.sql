CREATE TABLE budget (
    budget_id SERIAL PRIMARY KEY,          -- Auto-incrementing primary key
    user_id INT NOT NULL,                 -- Foreign key referencing 'users' table
    category_id INT NOT NULL,             -- Foreign key referencing 'category' table
    amount money NOT NULL,       -- Budgeted amount (supports up to 10 digits, with 2 decimals)
    month INT CHECK (month >= 1 AND month <= 12) NOT NULL, -- Month (1-12)
    year INT CHECK (year >= 1900) NOT NULL, -- Year (e.g., 2024)
    FOREIGN KEY (user_id) REFERENCES users(user_id),   -- Foreign key to 'users' table
    FOREIGN KEY (category_id) REFERENCES category(category_id)  -- Foreign key to 'category' table
);

ALTER TABLE IF EXISTS public.budget
    OWNER to postgres;


INSERT INTO budget (user_id, category_id, amount, month, year)
VALUES (1, 1, 1000.00, 9, 2024),  -- For user 1, category 1 (e.g., Rent), amount $1000 for September 2024
       (1, 2, 300.00, 9, 2024);  -- For user 1, category 2 (e.g., Groceries), amount $300 for September 2024