-- Create blogs table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

-- Insert two blogs
insert into blogs (author, url, title, likes) values ('Dan Abramov', '', 'On let vs const', 0);
insert into blogs (author, url, title, likes) values ('Laurenz Albe', '', 'Gaps in sequences in PostgreSQL', 0);