CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

-- Insert sample data
INSERT INTO projects (title, description, imageUrl) VALUES ('Project 1', 'Description for project 1', 'path/to/image1.jpg');
INSERT INTO projects (title, description, imageUrl) VALUES ('Project 2', 'Description for project 2', 'path/to/image2.jpg');
