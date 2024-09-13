CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,       -- Auto-incrementing primary key
    user_id INT NOT NULL,                    -- Foreign key referencing 'users' table
    amount money NOT NULL,                 -- Transaction amount (supports whole numbers)
    category_id INT NOT NULL,                -- Foreign key referencing 'category' table
    description TEXT,                       -- Optional description of the transaction
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date of the transaction
    type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,  -- Type: 'income' or 'expense'
    FOREIGN KEY (user_id) REFERENCES users(user_id),    -- Foreign key to 'users' table
    FOREIGN KEY (category_id) REFERENCES category(category_id)   -- Foreign key to 'category' table
);

ALTER TABLE IF EXISTS public.transactions
    OWNER to postgres;

	

-- Example insert for an income transaction
INSERT INTO transactions (user_id, amount, category, description, transaction_date, type)
VALUES (1, 1500.00, 'Salary', 'August paycheck', '2024-09-12', 'income');

-- Example insert for an expense transaction
INSERT INTO transactions (user_id, amount, category, description, transaction_date, type)
VALUES (1, 100.00, 'Groceries', 'Weekly groceries', '2024-09-11', 'expense');