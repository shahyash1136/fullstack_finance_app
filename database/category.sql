CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

ALTER TABLE IF EXISTS public.category
    OWNER to postgres;

INSERT INTO category (category_name) VALUES ('Rent'), ('Salary'), ('Groceries');