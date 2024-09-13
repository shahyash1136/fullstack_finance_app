CREATE TABLE goal (
    goal_id SERIAL PRIMARY KEY,                -- Auto-incrementing primary key
    user_id INT NOT NULL,                     -- Foreign key referencing 'users' table
    goal_name VARCHAR(100) NOT NULL,          -- Name of the goal (e.g., 'Save for Vacation')
    target_amount money NOT NULL,    -- Target amount for the goal (supports up to 10 digits, with 2 decimals)
    current_amount money DEFAULT 0.00, -- Current amount towards the goal (defaults to 0.00)
    deadline_date DATE NOT NULL,              -- Deadline for achieving the goal
    FOREIGN KEY (user_id) REFERENCES users(user_id) -- Foreign key to 'users' table
);

ALTER TABLE IF EXISTS public.goal
    OWNER to postgres;

-- Insert example data into the goal table
INSERT INTO goal (user_id, goal_name, target_amount, current_amount, deadline_date)
VALUES (1, 'Save for Vacation', 2000.00, 500.00, '2024-12-31'),
       (1, 'Buy New Laptop', 1500.00, 300.00, '2024-11-30');